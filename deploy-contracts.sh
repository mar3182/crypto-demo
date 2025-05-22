#!/bin/zsh

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "${YELLOW}Starting smart contract deployment process...${NC}"

# Step 1: Compile the contracts
echo "${YELLOW}Compiling smart contracts...${NC}"
npx hardhat compile
if [ $? -ne 0 ]; then
    echo "${RED}Contract compilation failed${NC}"
    exit 1
fi
echo "${GREEN}Smart contracts compiled successfully!${NC}"

# Step 2: Deploy to Sepolia testnet
echo "${YELLOW}Deploying smart contracts to Sepolia testnet...${NC}"
echo "${YELLOW}Make sure your .env file is properly configured with your private key and Infura API key.${NC}"
echo "${YELLOW}This operation will cost real gas. Do you want to continue? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    npx hardhat run scripts/deploy.js --network sepolia
    if [ $? -ne 0 ]; then
        echo "${RED}Smart contract deployment failed${NC}"
        exit 1
    fi
    echo "${GREEN}Smart contracts deployed successfully!${NC}"
    echo "${YELLOW}Please update your .env file with the new contract addresses.${NC}"
else
    echo "${YELLOW}Deployment cancelled by user.${NC}"
    exit 0
fi

# Step 3: Offer to verify the contracts
echo "${YELLOW}Do you want to verify your contracts on Etherscan? (y/n)${NC}"
read -r verify_response
if [[ "$verify_response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "${YELLOW}Please enter the DeveloperPortfolioNFT contract address:${NC}"
    read -r nft_address
    
    echo "${YELLOW}Verifying DeveloperPortfolioNFT contract...${NC}"
    npx hardhat verify --network sepolia "$nft_address"
    
    echo "${YELLOW}Please enter the ChallengeRegistry contract address:${NC}"
    read -r registry_address
    
    echo "${YELLOW}Verifying ChallengeRegistry contract...${NC}"
    npx hardhat verify --network sepolia "$registry_address" "$nft_address"
    
    echo "${YELLOW}Please enter the JobRoadmap contract address:${NC}"
    read -r roadmap_address
    
    echo "${YELLOW}Verifying JobRoadmap contract...${NC}"
    npx hardhat verify --network sepolia "$roadmap_address" "$nft_address"
    
    echo "${GREEN}Contract verification process completed!${NC}"
else
    echo "${YELLOW}Contract verification skipped.${NC}"
fi

echo "${GREEN}Smart contract deployment process completed!${NC}"
