# Crypto Oasis Portfolio Project

An interactive full-stack & blockchain portfolio showcasing MERN & Solidity development skills. This project is designed as a portfolio to demonstrate capabilities to recruiters.

![Crypto Oasis Portfolio Screenshot](public/images/00%20Landing%20Page.jpg)

## Features

- **On-Chain CV NFT**: A personal CV displayed as an ERC-721 NFT with on-chain metadata
- **Interactive Skill Demos**: Quizzes and challenges demonstrating JavaScript and Solidity knowledge
- **Live DApps**: Interactive blockchain applications running on the Sepolia testnet
- **Achievement Showcase**: Soul-Bound Tokens (SBTs) that verify skills and accomplishments
- **Wallet Connection**: MetaMask integration for blockchain interactions

## Tech Stack

- **Frontend**: React (with Vite), React Router, Tailwind CSS, NextUI Components
- **Blockchain**: Solidity, Ethers.js, Hardhat, Web3 integrations
- **Smart Contracts**: OpenZeppelin libraries, ERC-721 tokens
- **Deployment**: GitHub Pages (frontend), Sepolia testnet (smart contracts)

## Project Structure

```
crypto-oasis/
├── public/             # Static assets
│   └── images/         # Project images and screenshots
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   └── ui/         # UI components (ShowcaseCard, etc.)
│   ├── contexts/       # React contexts (WalletContext)
│   ├── contracts/      # Solidity smart contracts
│   │   └── abi/        # Contract ABI files
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Application pages
│   └── utils/          # Utility functions
├── scripts/            # Deployment scripts
└── hardhat.config.js   # Hardhat configuration
```

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

The project includes scripts for both frontend and smart contract deployment.

### Frontend Deployment (GitHub Pages)

```bash
# Deploy to GitHub Pages
npm run deploy

# Or use the provided deployment script
./deploy.sh
```

### Smart Contract Deployment

1. Setup environment variables in `.env` file based on `sample.env`.
2. Deploy contracts to Sepolia testnet:

```bash
# Use the deployment script
./deploy-contracts.sh

# Or use Hardhat directly
npx hardhat run scripts/deploy.js --network sepolia
```

For detailed deployment instructions, please refer to [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md).

## Live Demo

The deployed application is available at: [https://mar3182.github.io/crypto-demo/](https://mar3182.github.io/crypto-demo/)

## License

This project is licensed under the MIT License.

# Or use the provided deployment script
./deploy-contracts.sh
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
