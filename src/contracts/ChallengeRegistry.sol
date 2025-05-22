// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title ChallengeRegistry
 * @dev Smart contract for creating and managing skill challenges
 */
contract ChallengeRegistry is Ownable {
    // Structure for a challenge
    struct Challenge {
        string title;
        string description;
        string category;      // e.g., "Frontend", "Smart Contract", "Full Stack"
        string difficulty;    // e.g., "Beginner", "Intermediate", "Advanced"
        uint256 reward;       // in wei
        address creator;
        bool isActive;
        address[] participants;
        address[] completions;
        string repositoryUrl; // Optional GitHub repository URL with starter code
        uint256 createdAt;
    }
    
    // Interface to check for developer NFT ownership
    IERC721 public developerNFT;
    
    // Storage
    mapping(uint256 => Challenge) public challenges;
    mapping(address => uint256[]) public participantChallenges;
    mapping(address => uint256[]) public completedChallenges;
    
    uint256 private _challengeCounter;
    
    // Events
    event ChallengeCreated(uint256 indexed challengeId, address indexed creator, string title);
    event ChallengeJoined(uint256 indexed challengeId, address indexed participant);
    event ChallengeCompleted(uint256 indexed challengeId, address indexed participant);
    event RewardClaimed(uint256 indexed challengeId, address indexed participant, uint256 amount);
    
    constructor(address _developerNFT) {
        developerNFT = IERC721(_developerNFT);
    }
    
    /**
     * @dev Creates a new challenge
     * @param title The title of the challenge
     * @param description The description of the challenge
     * @param category The category of the challenge
     * @param difficulty The difficulty level of the challenge
     * @param repositoryUrl The GitHub repository URL with starter code
     * @return The ID of the newly created challenge
     */
    function createChallenge(
        string memory title,
        string memory description,
        string memory category,
        string memory difficulty,
        string memory repositoryUrl
    ) 
        external 
        payable
        returns (uint256) 
    {
        _challengeCounter++;
        uint256 challengeId = _challengeCounter;
        
        challenges[challengeId] = Challenge({
            title: title,
            description: description,
            category: category,
            difficulty: difficulty,
            reward: msg.value,
            creator: msg.sender,
            isActive: true,
            participants: new address[](0),
            completions: new address[](0),
            repositoryUrl: repositoryUrl,
            createdAt: block.timestamp
        });
        
        emit ChallengeCreated(challengeId, msg.sender, title);
        
        return challengeId;
    }
    
    /**
     * @dev Allows a developer to join a challenge
     * @param challengeId The ID of the challenge
     */
    function joinChallenge(uint256 challengeId) external {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.isActive, "Challenge is not active");
        require(developerNFT.balanceOf(msg.sender) > 0, "Must hold developer NFT to participate");
        
        // Check if developer is already a participant
        bool isParticipant = false;
        for (uint256 i = 0; i < challenge.participants.length; i++) {
            if (challenge.participants[i] == msg.sender) {
                isParticipant = true;
                break;
            }
        }
        
        require(!isParticipant, "Already participating in this challenge");
        
        challenge.participants.push(msg.sender);
        participantChallenges[msg.sender].push(challengeId);
        
        emit ChallengeJoined(challengeId, msg.sender);
    }
    
    /**
     * @dev Marks a challenge as completed for a participant
     * @param challengeId The ID of the challenge
     * @param participant The address of the participant
     */
    function completeChallenge(uint256 challengeId, address participant) external {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.creator == msg.sender, "Only challenge creator can mark as complete");
        require(challenge.isActive, "Challenge is not active");
        
        // Verify the participant has joined
        bool isParticipant = false;
        for (uint256 i = 0; i < challenge.participants.length; i++) {
            if (challenge.participants[i] == participant) {
                isParticipant = true;
                break;
            }
        }
        require(isParticipant, "Address is not a participant");
        
        // Check if already completed
        bool hasCompleted = false;
        for (uint256 i = 0; i < challenge.completions.length; i++) {
            if (challenge.completions[i] == participant) {
                hasCompleted = true;
                break;
            }
        }
        require(!hasCompleted, "Participant already completed this challenge");
        
        // Mark as completed
        challenge.completions.push(participant);
        completedChallenges[participant].push(challengeId);
        
        // Send reward if available
        if (challenge.reward > 0) {
            // Calculate individual reward (in case multiple completions are allowed)
            uint256 individualReward = challenge.reward / challenge.completions.length;
            
            (bool success, ) = payable(participant).call{value: individualReward}("");
            require(success, "Reward transfer failed");
            
            emit RewardClaimed(challengeId, participant, individualReward);
        }
        
        emit ChallengeCompleted(challengeId, participant);
    }
    
    /**
     * @dev Deactivates a challenge
     * @param challengeId The ID of the challenge
     */
    function deactivateChallenge(uint256 challengeId) external {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.creator == msg.sender || owner() == msg.sender, "Not authorized");
        require(challenge.isActive, "Challenge already inactive");
        
        challenge.isActive = false;
    }
    
    /**
     * @dev Gets all challenges created by an address
     * @param creator The creator address
     * @return An array of challenge IDs
     */
    function getChallengesByCreator(address creator) external view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= _challengeCounter; i++) {
            if (challenges[i].creator == creator) {
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= _challengeCounter; i++) {
            if (challenges[i].creator == creator) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }
    
    /**
     * @dev Gets challenge details
     * @param challengeId The ID of the challenge
     * @return The challenge details
     */
    function getChallengeDetails(uint256 challengeId) external view returns (
        string memory title,
        string memory description,
        string memory category,
        string memory difficulty,
        uint256 reward,
        address creator,
        bool isActive,
        uint256 participantCount,
        uint256 completionCount
    ) {
        Challenge storage challenge = challenges[challengeId];
        return (
            challenge.title,
            challenge.description,
            challenge.category,
            challenge.difficulty,
            challenge.reward,
            challenge.creator,
            challenge.isActive,
            challenge.participants.length,
            challenge.completions.length
        );
    }
}
