// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy DeveloperPortfolioNFT
  const DeveloperPortfolioNFT = await hre.ethers.getContractFactory("DeveloperPortfolioNFT");
  const developerPortfolioNFT = await DeveloperPortfolioNFT.deploy();
  await developerPortfolioNFT.deployed();
  console.log("DeveloperPortfolioNFT deployed to:", developerPortfolioNFT.address);

  // Deploy ChallengeRegistry with the NFT address
  const ChallengeRegistry = await hre.ethers.getContractFactory("ChallengeRegistry");
  const challengeRegistry = await ChallengeRegistry.deploy(developerPortfolioNFT.address);
  await challengeRegistry.deployed();
  console.log("ChallengeRegistry deployed to:", challengeRegistry.address);

  // Deploy JobRoadmap with the NFT address
  const JobRoadmap = await hre.ethers.getContractFactory("JobRoadmap");
  const jobRoadmap = await JobRoadmap.deploy(developerPortfolioNFT.address);
  await jobRoadmap.deployed();
  console.log("JobRoadmap deployed to:", jobRoadmap.address);

  console.log("All contracts deployed successfully!");
  
  // Print a summary
  console.log("\nContract Addresses Summary:");
  console.log("============================");
  console.log(`DeveloperPortfolioNFT: ${developerPortfolioNFT.address}`);
  console.log(`ChallengeRegistry: ${challengeRegistry.address}`);
  console.log(`JobRoadmap: ${jobRoadmap.address}`);
  console.log("\nUpdate your .env file with these addresses");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
