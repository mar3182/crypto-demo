import { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);
  
  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum !== undefined;
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setIsConnected(false);
      setAddress("");
      setSigner(null);
    } else {
      // User switched accounts
      setAddress(accounts[0]);
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainIdHex) => {
    setChainId(parseInt(chainIdHex, 16));
    
    // Refresh the page to ensure everything is in sync with the new chain
    window.location.reload();
  };

  // Add event listeners when the wallet is connected
  useEffect(() => {
    if (isConnected && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      // Clean up event listeners when component unmounts
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isConnected]);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert("Please install MetaMask to use this application! Visit https://metamask.io to get started.");
      window.open("https://metamask.io", "_blank");
      return;
    }
    
    try {
      setConnecting(true);
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      // Get the current chain ID
      const chainIdHex = await window.ethereum.request({
        method: 'eth_chainId'
      });
      
      // Create a provider and signer
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const ethersSigner = await ethersProvider.getSigner();
      
      setIsConnected(true);
      setAddress(accounts[0]);
      setProvider(ethersProvider);
      setSigner(ethersSigner);
      setChainId(parseInt(chainIdHex, 16));
      
      // Check if the user is on Sepolia network
      const currentChainId = parseInt(chainIdHex, 16);
      if (currentChainId !== 11155111) {
        // Show network switch notification
        if (confirm("This application works best on Sepolia testnet. Would you like to switch networks?")) {
          await switchToSepolia();
        }
      }
      
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      
      // Provide more specific error messages based on error type
      if (error.code === 4001) {
        alert("Connection rejected. Please approve the connection request in MetaMask to continue.");
      } else if (error.code === -32002) {
        alert("Connection request already pending. Please check your MetaMask extension.");
      } else if (error.message && error.message.includes("Already processing eth_requestAccounts")) {
        alert("Connection request in progress. Please check your MetaMask extension.");
      } else {
        alert(`Failed to connect wallet: ${error.message || "Unknown error"}`);
      }
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet (note: this doesn't actually disconnect MetaMask,
  // it just clears our local state)
  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    setProvider(null);
    setSigner(null);
  };

  // Check if the current chain is Sepolia (chainId 11155111)
  const isSepoliaNetwork = chainId === 11155111;

  // Switch to Sepolia network
  const switchToSepolia = async () => {
    if (!window.ethereum) return;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Chain ID for Sepolia in hex
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xaa36a7',
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://rpc.sepolia.org'],
                blockExplorerUrls: ['https://sepolia.etherscan.io']
              }
            ]
          });
        } catch (addError) {
          console.error("Error adding Sepolia network:", addError);
        }
      } else {
        console.error("Error switching to Sepolia:", error);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        provider,
        signer,
        chainId,
        connecting,
        isSepoliaNetwork,
        connectWallet,
        disconnectWallet,
        switchToSepolia
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
