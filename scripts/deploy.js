// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy DeveloperPortfolioNFT
  const DeveloperPortfolioNFT = await ethers.getContractFactory("DeveloperPortfolioNFT");
  const developerPortfolioNFT = await DeveloperPortfolioNFT.deploy();
  await developerPortfolioNFT.waitForDeployment();
  console.log("DeveloperPortfolioNFT deployed to:", await developerPortfolioNFT.getAddress());

  // Deploy ChallengeRegistry with the NFT address
  const ChallengeRegistry = await ethers.getContractFactory("ChallengeRegistry");
  const challengeRegistry = await ChallengeRegistry.deploy(await developerPortfolioNFT.getAddress());
  await challengeRegistry.waitForDeployment();
  console.log("ChallengeRegistry deployed to:", await challengeRegistry.getAddress());

  // Deploy JobRoadmap with the NFT address
  const JobRoadmap = await ethers.getContractFactory("JobRoadmap");
  const jobRoadmap = await JobRoadmap.deploy(await developerPortfolioNFT.getAddress());
  await jobRoadmap.waitForDeployment();
  console.log("JobRoadmap deployed to:", await jobRoadmap.getAddress());

  console.log("All contracts deployed successfully!");
  
  // Print a summary
  console.log("\nContract Addresses Summary:");
  console.log("============================");
  console.log(`DeveloperPortfolioNFT: ${await developerPortfolioNFT.getAddress()}`);
  console.log(`ChallengeRegistry: ${await challengeRegistry.getAddress()}`);
  console.log(`JobRoadmap: ${await jobRoadmap.getAddress()}`);
  console.log("\nUpdate your .env file with these addresses");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
