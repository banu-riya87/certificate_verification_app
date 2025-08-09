
# Certificate Verification DApp

## Project Summary
This project is a full-stack blockchain-based certificate verification system. It includes:

- **Solidity Smart Contract** (`contracts/Certificate.sol`):
  - Issues, verifies, and lists certificates on Ethereum.
- **Node.js Backend** (`backend/server.js`):
  - REST API for issuing, verifying, and listing certificates.
  - Interacts with the smart contract and IPFS for metadata storage.
  - Loads configuration (contract address, IPFS API, private key) from `backend/config.json`.
- **Frontend** (`frontend/index.html`):
  - Simple web interface for users and admins.
  - MetaMask integration for blockchain interaction.
  - Forms for issuing, verifying, and listing certificates.
- **IPFS Integration**:
  - Certificate metadata is stored on IPFS (local or Infura, configurable).
- **Scripts**:
  - Modular shell scripts to start each component and deploy contracts.
  - `start_app.sh` runs backend and frontend together.
- **Configurable**:
  - All endpoints, contract addresses, and keys are set in `backend/config.json`.

---

This project is a full-stack blockchain-based certificate verification system using Ethereum smart contracts, IPFS, Node.js backend, and a simple web frontend with MetaMask integration.

## How to Move and Run the Project in a New Location

1. **Copy the Entire Project Folder**
   - Move or copy the whole `Certificate_verification_project` directory to your new location.

2. **Install Dependencies**
   - Open a terminal in the new project root.
   - Run the following in each subfolder:
     - `npm install`
     - (Frontend is static, no install needed unless you add a build system)

3. **Start the Stack**
   - Open multiple terminals or use the provided scripts:
     - `start_node.sh` — Start Hardhat local blockchain
     - `deploy_contract.sh` — Compile and deploy the smart contract
     - `start_ipfs.sh` — Start local IPFS node
     - `start_app.sh` — Start backend and frontend together

   - Or run each script in order, each in its own terminal.

4. **Access the DApp**
   - Open your browser and go to [http://localhost:8080](http://localhost:8080)
   - Connect MetaMask (set to Localhost 8545 network)
   - Issue Certificate 
        Sample Certificate metadata - 
        {
          "studentName": "Alice Johnson",
          "course": "Blockchain Fundamentals",
          "grade": "A+",
          "dateIssued": "2025-08-09",
          "issuer": "Acme University"
        }
   - List certifactes for the given owner wallet address
   - Verify Certificate 


## Configuration
- Edit `backend/config.json` to set your contract address, IPFS API, and private key.

## Requirements
- Node.js (v18+ recommended)
- npm
- Hardhat (`npm install -g hardhat` if not installed globally)
- IPFS Desktop or Kubo CLI (`ipfs daemon`)
- MetaMask browser extension

## Scripts
- `start_node.sh` — Start Hardhat node
- `deploy_contract.sh` — Compile and deploy contract
- `start_ipfs.sh` — Start IPFS node
- `start_app.sh` — Start backend and frontend

## Notes
- For Windows, use Git Bash or WSL for `.sh` scripts, or request batch scripts.
- All sensitive values (private key, contract address) are in `backend/config.json`.

---

For any issues or to add new features, update the code or configuration as needed.
