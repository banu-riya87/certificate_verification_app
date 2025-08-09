#!/bin/bash
# Compile and deploy the smart contract
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
cd ..
