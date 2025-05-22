// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title JobRoadmap
 * @dev Smart contract for creating job opportunity roadmaps with milestone tasks
 */
contract JobRoadmap is Ownable {
    // Structure for a job milestone task
    struct Task {
        string title;
        string description;
        bool isCompleted;
        uint256 rewardAmount; // in wei
    }
    
    // Structure for a job roadmap
    struct Roadmap {
        string title;
        string description;
        address recruiter;
        address developer;
        bool isActive;
        uint256 totalReward;
        uint256[] completedTaskIds;
        uint256 createdAt;
    }
    
    // Interface to check for developer NFT ownership
    IERC721 public developerNFT;
    
    // Storage
    mapping(uint256 => Roadmap) public roadmaps;
    mapping(uint256 => mapping(uint256 => Task)) public roadmapTasks;
    mapping(uint256 => uint256) public roadmapTaskCount;
    
    uint256 private _roadmapCounter;
    
    // Events
    event RoadmapCreated(uint256 indexed roadmapId, address indexed recruiter, string title);
    event TaskAdded(uint256 indexed roadmapId, uint256 indexed taskId, string title);
    event TaskCompleted(uint256 indexed roadmapId, uint256 indexed taskId, address developer);
    event RoadmapAssigned(uint256 indexed roadmapId, address indexed developer);
    event RewardClaimed(uint256 indexed roadmapId, address indexed developer, uint256 amount);
    
    constructor(address _developerNFT) {
        developerNFT = IERC721(_developerNFT);
    }
    
    /**
     * @dev Creates a new job roadmap
     * @param title The title of the roadmap
     * @param description The description of the roadmap
     * @return The ID of the newly created roadmap
     */
    function createRoadmap(string memory title, string memory description) 
        external 
        returns (uint256) 
    {
        _roadmapCounter++;
        uint256 roadmapId = _roadmapCounter;
        
        roadmaps[roadmapId] = Roadmap({
            title: title,
            description: description,
            recruiter: msg.sender,
            developer: address(0), // Not assigned yet
            isActive: true,
            totalReward: 0,
            completedTaskIds: new uint256[](0),
            createdAt: block.timestamp
        });
        
        emit RoadmapCreated(roadmapId, msg.sender, title);
        
        return roadmapId;
    }
    
    /**
     * @dev Adds a task to an existing roadmap
     * @param roadmapId The ID of the roadmap
     * @param title The title of the task
     * @param description The description of the task
     * @param rewardAmount The reward amount for completing this task
     */
    function addTask(
        uint256 roadmapId,
        string memory title,
        string memory description,
        uint256 rewardAmount
    ) 
        external
        payable 
    {
        Roadmap storage roadmap = roadmaps[roadmapId];
        require(roadmap.recruiter == msg.sender, "Only recruiter can add tasks");
        require(roadmap.isActive, "Roadmap is not active");
        require(msg.value == rewardAmount, "Sent ETH must match reward amount");
        
        uint256 taskId = roadmapTaskCount[roadmapId];
        roadmapTasks[roadmapId][taskId] = Task({
            title: title,
            description: description,
            isCompleted: false,
            rewardAmount: rewardAmount
        });
        
        roadmapTaskCount[roadmapId]++;
        roadmap.totalReward += rewardAmount;
        
        emit TaskAdded(roadmapId, taskId, title);
    }
    
    /**
     * @dev Assigns a roadmap to a developer
     * @param roadmapId The ID of the roadmap
     * @param developer The address of the developer
     */
    function assignRoadmap(uint256 roadmapId, address developer) external {
        Roadmap storage roadmap = roadmaps[roadmapId];
        require(roadmap.recruiter == msg.sender, "Only recruiter can assign roadmap");
        require(roadmap.isActive, "Roadmap is not active");
        require(roadmap.developer == address(0), "Roadmap already assigned");
        require(developerNFT.balanceOf(developer) > 0, "Developer must hold portfolio NFT");
        
        roadmap.developer = developer;
        
        emit RoadmapAssigned(roadmapId, developer);
    }
    
    /**
     * @dev Marks a task as completed and releases the reward
     * @param roadmapId The ID of the roadmap
     * @param taskId The ID of the task
     */
    function completeTask(uint256 roadmapId, uint256 taskId) external {
        Roadmap storage roadmap = roadmaps[roadmapId];
        Task storage task = roadmapTasks[roadmapId][taskId];
        
        require(roadmap.recruiter == msg.sender, "Only recruiter can mark task complete");
        require(roadmap.isActive, "Roadmap is not active");
        require(roadmap.developer != address(0), "Roadmap not assigned to developer");
        require(!task.isCompleted, "Task already completed");
        
        task.isCompleted = true;
        roadmap.completedTaskIds.push(taskId);
        
        // Transfer reward to developer
        (bool success, ) = payable(roadmap.developer).call{value: task.rewardAmount}("");
        require(success, "Reward transfer failed");
        
        emit TaskCompleted(roadmapId, taskId, roadmap.developer);
        emit RewardClaimed(roadmapId, roadmap.developer, task.rewardAmount);
    }
    
    /**
     * @dev Gets all tasks for a roadmap
     * @param roadmapId The ID of the roadmap
     * @return An array of tasks
     */
    function getRoadmapTasks(uint256 roadmapId) external view returns (Task[] memory) {
        uint256 taskCount = roadmapTaskCount[roadmapId];
        Task[] memory tasks = new Task[](taskCount);
        
        for (uint256 i = 0; i < taskCount; i++) {
            tasks[i] = roadmapTasks[roadmapId][i];
        }
        
        return tasks;
    }
    
    /**
     * @dev Gets the count of completed tasks for a roadmap
     * @param roadmapId The ID of the roadmap
     * @return The count of completed tasks
     */
    function getCompletedTaskCount(uint256 roadmapId) external view returns (uint256) {
        return roadmaps[roadmapId].completedTaskIds.length;
    }
}
