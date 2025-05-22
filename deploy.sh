#!/bin/zsh

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "${YELLOW}Starting deployment process...${NC}"

# Step 1: Install dependencies
echo "${YELLOW}Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo "${RED}Failed to install dependencies${NC}"
    exit 1
fi
echo "${GREEN}Dependencies installed successfully!${NC}"

# Step 2: Build the application
echo "${YELLOW}Building the application...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo "${RED}Build failed${NC}"
    exit 1
fi
echo "${GREEN}Build completed successfully!${NC}"

# Step 3: Deploy to GitHub Pages
echo "${YELLOW}Deploying to GitHub Pages...${NC}"
npx gh-pages -d dist
if [ $? -ne 0 ]; then
    echo "${RED}Deployment to GitHub Pages failed${NC}"
    exit 1
fi
echo "${GREEN}Deployment to GitHub Pages completed successfully!${NC}"

echo "${GREEN}Deployment process completed!${NC}"
echo "${YELLOW}Your application is now available at: https://mar3182.github.io/crypto-demo/${NC}"
