const express = require('express');
const { ethers } = require('ethers');
const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Load config
const config = require('./config.json');
// Load contract ABI and address
const contractABI = require('../artifacts/contracts/Certificate.sol/Certificate.json').abi;
const contractAddress = config.CONTRACT_ADDRESS;

// Connect to local Hardhat node
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
// Replace with one of the private keys from your Hardhat node output
const PRIVATE_KEY = config.PRIVATE_KEY;
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
// IPFS client
const ipfs = create({ url: config.IPFS_API });
const app = express();
app.use(cors());
app.use(express.json());

// Issue certificate endpoint
app.post('/issue', async (req, res) => {
  try {
    const { recipient, metadata } = req.body;
    // Upload metadata to IPFS
    const { path: ipfsHash } = await ipfs.add(JSON.stringify(metadata));
    // Issue certificate on blockchain
    const tx = await contract.issueCertificate(recipient, ipfsHash);
    await tx.wait();
    res.json({ success: true, ipfsHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify certificate endpoint
app.post('/verify', async (req, res) => {
  try {
    const { certId, recipient, ipfsHash } = req.body;
    const isValid = await contract.verifyCertificate(certId, recipient, ipfsHash);
    res.json({ valid: isValid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all certificate IDs owned by an address
app.get('/certificates/:owner', async (req, res) => {
  try {
    const owner = req.params.owner;
    const certIds = await contract.getCertificatesByOwner(owner);
    // Convert BigInt values to string for JSON serialization
    const certIdsStr = certIds.map(id => id.toString());
    res.json({ certIds: certIdsStr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});
