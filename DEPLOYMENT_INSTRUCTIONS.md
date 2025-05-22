# Deployment Instructions for Crypto Oasis

## Frontend Deployment

The frontend has been deployed to GitHub Pages and can be accessed at:
https://mar3182.github.io/crypto-demo/

## Smart Contract Deployment

Follow these steps to deploy the smart contracts to the Sepolia testnet:

### 1. Setup Environment Variables

Create a `.env` file in the root directory with the following content:

```
# Blockchain configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY

# Replace with your actual values:
# - Get an Infura Project ID by signing up at https://infura.io/
# - Your wallet private key (make sure to keep this secret and never commit it to git)
# - Get an Etherscan API key by signing up at https://etherscan.io/myapikey
```

### 2. Install Dependencies

```
cd /Users/admin/Desktop/CryptoPoker/crypto-oasis
npm install
```

### 3. Compile Smart Contracts

```
npm run compile:contracts
```

### 4. Deploy Smart Contracts

```
./deploy-contracts.sh
```

This script will:
- Compile the contracts
- Prompt you to confirm deployment (which will cost gas fees)
- Deploy all contracts to Sepolia testnet
- Provide contract addresses to update your .env file

### 5. Update Frontend with Contract Addresses

After deployment, update the .env file with the new contract addresses:

```
# Contract addresses (Sepolia testnet)
VITE_DEVELOPER_PORTFOLIO_NFT_ADDRESS=your_deployed_address
VITE_JOB_ROADMAP_ADDRESS=your_deployed_address
VITE_CHALLENGE_REGISTRY_ADDRESS=your_deployed_address
```

### 6. Rebuild and Redeploy Frontend

```
npm run deploy
```

## Testing the Application

1. Visit the deployed application at: https://mar3182.github.io/crypto-demo/
2. Connect your MetaMask wallet (make sure it's set to Sepolia testnet)
3. Test the following features:
   - Wallet connection
   - Skill demonstrations
   - CV NFT interaction
   - Live DApps interaction
   - About page information

## Troubleshooting

If you encounter any issues during deployment:

1. Check your .env file has correct values
2. Make sure your Sepolia wallet has enough ETH for gas fees
3. Verify that Hardhat is properly configured in hardhat.config.js
4. Check your MetaMask is configured to use Sepolia testnet
