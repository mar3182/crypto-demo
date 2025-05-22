// Utility functions for blockchain interactions

import { ethers } from 'ethers';
import DeveloperPortfolioNFTAbi from '../contracts/abi/DeveloperPortfolioNFT.json';
import JobRoadmapAbi from '../contracts/abi/JobRoadmap.json';
import ChallengeRegistryAbi from '../contracts/abi/ChallengeRegistry.json';

// Contract addresses (you'll need to deploy these contracts and update these addresses)
const DEVELOPER_PORTFOLIO_NFT_ADDRESS = import.meta.env.VITE_DEVELOPER_PORTFOLIO_NFT_ADDRESS || '';
const JOB_ROADMAP_ADDRESS = import.meta.env.VITE_JOB_ROADMAP_ADDRESS || '';
const CHALLENGE_REGISTRY_ADDRESS = import.meta.env.VITE_CHALLENGE_REGISTRY_ADDRESS || '';

/**
 * Get contract instances connected to the provided signer
 * @param {ethers.Signer} signer - The ethers.js signer to connect with
 * @returns {Object} Object containing contract instances
 */
export const getContracts = (signer) => {
  if (!signer) return null;
  
  try {
    const developerPortfolioNFT = new ethers.Contract(
      DEVELOPER_PORTFOLIO_NFT_ADDRESS,
      DeveloperPortfolioNFTAbi,
      signer
    );
    
    const jobRoadmap = new ethers.Contract(
      JOB_ROADMAP_ADDRESS,
      JobRoadmapAbi,
      signer
    );
    
    const challengeRegistry = new ethers.Contract(
      CHALLENGE_REGISTRY_ADDRESS,
      ChallengeRegistryAbi,
      signer
    );
    
    return {
      developerPortfolioNFT,
      jobRoadmap,
      challengeRegistry
    };
  } catch (error) {
    console.error("Error creating contract instances:", error);
    return null;
  }
};

/**
 * Mint a new Developer Portfolio NFT
 * @param {Object} contract - The ethers.js contract instance
 * @param {string} to - The recipient address
 * @param {number} keyType - The type of key (0: Profile, 1: Technical, 2: Experience)
 * @param {string} tokenURI - The IPFS URI of the metadata
 * @returns {Promise<Object>} Transaction receipt
 */
export const mintPortfolioNFT = async (contract, to, keyType, tokenURI) => {
  try {
    const tx = await contract.mintKey(to, keyType, tokenURI);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};

/**
 * Create a new job roadmap
 * @param {Object} contract - The ethers.js contract instance
 * @param {string} title - The roadmap title
 * @param {string} description - The roadmap description
 * @returns {Promise<Object>} Transaction receipt and roadmap ID
 */
export const createJobRoadmap = async (contract, title, description) => {
  try {
    const tx = await contract.createRoadmap(title, description);
    const receipt = await tx.wait();
    
    // Extract the roadmap ID from the logs/events
    const event = receipt.logs
      .map(log => contract.interface.parseLog(log))
      .find(event => event && event.name === 'RoadmapCreated');
    
    return {
      receipt,
      roadmapId: event ? event.args.roadmapId : null
    };
  } catch (error) {
    console.error("Error creating roadmap:", error);
    throw error;
  }
};

/**
 * Add a task to a job roadmap
 * @param {Object} contract - The ethers.js contract instance
 * @param {number} roadmapId - The roadmap ID
 * @param {string} title - The task title
 * @param {string} description - The task description
 * @param {string|number} rewardAmount - The reward amount in ETH
 * @returns {Promise<Object>} Transaction receipt
 */
export const addTaskToRoadmap = async (contract, roadmapId, title, description, rewardAmount) => {
  try {
    // Convert ETH to wei
    const rewardInWei = ethers.parseEther(rewardAmount.toString());
    
    const tx = await contract.addTask(roadmapId, title, description, rewardInWei, {
      value: rewardInWei
    });
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error adding task to roadmap:", error);
    throw error;
  }
};

/**
 * Create a new challenge
 * @param {Object} contract - The ethers.js contract instance
 * @param {string} title - The challenge title
 * @param {string} description - The challenge description
 * @param {string} category - The challenge category
 * @param {string} difficulty - The challenge difficulty
 * @param {string} repositoryUrl - The GitHub repository URL
 * @param {string|number} reward - The reward amount in ETH
 * @returns {Promise<Object>} Transaction receipt and challenge ID
 */
export const createChallenge = async (
  contract, 
  title, 
  description, 
  category, 
  difficulty, 
  repositoryUrl, 
  reward
) => {
  try {
    // Convert ETH to wei
    const rewardInWei = ethers.parseEther(reward.toString());
    
    const tx = await contract.createChallenge(
      title,
      description,
      category,
      difficulty,
      repositoryUrl,
      { value: rewardInWei }
    );
    
    const receipt = await tx.wait();
    
    // Extract the challenge ID from the logs/events
    const event = receipt.logs
      .map(log => contract.interface.parseLog(log))
      .find(event => event && event.name === 'ChallengeCreated');
    
    return {
      receipt,
      challengeId: event ? event.args.challengeId : null
    };
  } catch (error) {
    console.error("Error creating challenge:", error);
    throw error;
  }
};

/**
 * Upload metadata to IPFS
 * @param {Object} metadata - The metadata object
 * @returns {Promise<string>} IPFS URL
 */
export const uploadMetadataToIPFS = async (metadata) => {
  try {
    // This is a placeholder for IPFS upload
    // In a real app, you would use a service like Pinata, NFT.Storage, or IPFS HTTP client
    
    // For demo purposes, we'll just log the metadata and return a mock IPFS URL
    console.log("Uploading metadata to IPFS:", metadata);
    
    // Create a mock IPFS URL with a hash based on the current timestamp
    const mockHash = `Qm${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
    return `ipfs://${mockHash}`;
    
    // In a real implementation, you would use:
    // const response = await fetch('/api/upload-to-ipfs', {
    //   method: 'POST',
    //   body: JSON.stringify(metadata),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    // const data = await response.json();
    // return data.url;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};

/**
 * Format wallet address for display
 * @param {string} address - The wallet address
 * @returns {string} Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Check if the provided contracts are properly connected
 * @param {Object} contracts - The contract instances object
 * @returns {boolean} True if contracts are valid
 */
export const validateContracts = (contracts) => {
  return (
    contracts &&
    contracts.developerPortfolioNFT &&
    contracts.developerPortfolioNFT.runner &&
    contracts.jobRoadmap &&
    contracts.jobRoadmap.runner &&
    contracts.challengeRegistry &&
    contracts.challengeRegistry.runner
  );
};
