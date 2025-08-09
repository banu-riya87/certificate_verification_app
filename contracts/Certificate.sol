// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    address public admin;
    uint256 public certificateCount;

    struct Cert {
        uint256 id;
        address recipient;
        string ipfsHash;
        uint256 issuedAt;
    }

    mapping(uint256 => Cert) public certificates;
    mapping(address => uint256[]) public ownedCertificates;

    event CertificateIssued(uint256 indexed id, address indexed recipient, string ipfsHash, uint256 issuedAt);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(address recipient, string memory ipfsHash) public onlyAdmin {
        certificateCount++;
        certificates[certificateCount] = Cert(certificateCount, recipient, ipfsHash, block.timestamp);
        ownedCertificates[recipient].push(certificateCount);
        emit CertificateIssued(certificateCount, recipient, ipfsHash, block.timestamp);
    }

    function verifyCertificate(uint256 certId, address recipient, string memory ipfsHash) public view returns (bool) {
        Cert memory cert = certificates[certId];
        return (cert.recipient == recipient && keccak256(bytes(cert.ipfsHash)) == keccak256(bytes(ipfsHash)));
    }

    function getCertificatesByOwner(address owner) public view returns (uint256[] memory) {
        return ownedCertificates[owner];
    }
}
