# Crypto Oasis Portfolio Project

An interactive full-stack & blockchain portfolio showcasing MERN & Solidity development skills. This project is designed as a portfolio to demonstrate capabilities to recruiters.

## Features

- **On-Chain CV NFT**: A personal CV displayed as an ERC-721 NFT with on-chain metadata
- **Interactive Skill Demos**: Quizzes and challenges demonstrating JavaScript and Solidity knowledge
- **Live DApps**: Interactive blockchain applications running on the Sepolia testnet
- **Achievement Showcase**: Soul-Bound Tokens (SBTs) that verify skills and accomplishments

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, NextUI
- **Blockchain**: Solidity, Ethers.js, Web3 integrations
- **Backend**: Node.js/Express.js (API endpoints)
- **Storage**: IPFS for decentralized content

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Frontend Deployment (GitHub Pages)

```bash
# Deploy to GitHub Pages
npm run deploy
```

### Smart Contract Deployment

1. Setup environment variables in `.env` file based on `sample.env`.
2. Deploy contracts to Sepolia testnet:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Update the `.env` file with the newly deployed contract addresses.

## Project Structure

- `/src` - React application source code
- `/src/components` - Reusable UI components
- `/src/contexts` - React context providers (wallet, authentication)
- `/src/pages` - Main application views
- `/contracts` - Solidity smart contracts
- `/docs` - Project documentation and specifications

## Blockchain Integration

This project uses MetaMask for wallet connection and interacts with custom smart contracts deployed on the Sepolia testnet.

### Smart Contract Verification

After deploying your contracts, you can verify them on Etherscan for better transparency:

```bash
# Verify the DeveloperPortfolioNFT contract
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS>

# Verify the ChallengeRegistry contract (requires constructor arguments)
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS> <DEVELOPER_NFT_ADDRESS>

# Verify the JobRoadmap contract (requires constructor arguments)
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS> <DEVELOPER_NFT_ADDRESS>
```

## License

MIT
