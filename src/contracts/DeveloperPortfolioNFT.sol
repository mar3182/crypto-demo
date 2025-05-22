// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title DeveloperPortfolioNFT
 * @dev ERC721 contract for recruiters to mint themed "keys" to access platform features
 */
contract DeveloperPortfolioNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Key types
    enum KeyType { PROFILE_VISION, TECHNICAL_PROWESS, APPLIED_EXPERIENCE }
    
    // Mapping from token ID to key type
    mapping(uint256 => KeyType) public keyTypes;
    
    // Events
    event PortfolioKeyMinted(address indexed recipient, uint256 indexed tokenId, KeyType keyType);
    
    constructor() ERC721("Developer Portfolio NFT", "DEVNFT") {}
    
    /**
     * @dev Mints a new key of a specific type to the recruiter
     * @param to The address of the recruiter
     * @param keyType The type of key (0: Profile & Vision, 1: Technical Prowess, 2: Applied Experience)
     * @param tokenURI_ The URI pointing to the metadata on IPFS
     * @return The token ID of the newly minted NFT
     */
    function mintKey(address to, KeyType keyType, string memory tokenURI_) 
        public 
        returns (uint256) 
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI_);
        keyTypes[newTokenId] = keyType;
        
        emit PortfolioKeyMinted(to, newTokenId, keyType);
        
        return newTokenId;
    }
    
    /**
     * @dev Returns the key type for a given token ID
     * @param tokenId The ID of the token
     * @return The key type
     */
    function getKeyType(uint256 tokenId) external view returns (KeyType) {
        require(_exists(tokenId), "DeveloperPortfolioNFT: Key does not exist");
        return keyTypes[tokenId];
    }
    
    /**
     * @dev Check if an address owns at least one NFT of any type
     * @param owner The address to check
     * @return True if the address owns at least one NFT
     */
    function isPortfolioNFTHolder(address owner) external view returns (bool) {
        return balanceOf(owner) > 0;
    }
}
