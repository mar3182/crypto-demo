import { useWallet } from '../contexts/WalletContext';
import { Button } from '@nextui-org/react';

const CvNftPage = () => {
  const { isConnected, connectWallet } = useWallet();
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">My CV NFT</h1>
      
      {!isConnected ? (
        <div className="bg-background-card rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="mb-6 text-text-secondary">
            Connect your wallet to view the CV NFT and its on-chain details.
          </p>
          <Button 
            color="primary" 
            onClick={connectWallet}
            className="bg-primary text-black font-semibold"
          >
            Connect MetaMask
          </Button>
        </div>
      ) : (
        <div className="bg-background-card rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* NFT Preview Section */}
            <div className="flex flex-col items-center">
              <div className="bg-background-dark rounded-lg p-4 mb-4 w-full">
                <img 
                  src="/images/cv-nft-avatar-experience.png" 
                  alt="CV NFT" 
                  className="w-full rounded-lg"
                />
              </div>
              <Button 
                color="primary" 
                className="w-full bg-primary text-black font-semibold"
              >
                Mint Developer Portfolio NFT
              </Button>
            </div>
            
            {/* CV Content Section */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Developer Profile</h2>
              
              <div className="space-y-6">
                <div className="bg-background-dark rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-primary">Experience</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Senior Blockchain Developer</h4>
                      <p className="text-text-secondary text-sm">DeFi Protocol • 2023 - Present</p>
                      <p className="text-sm mt-1">Led the development of smart contracts and frontend integration for a DeFi lending platform.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Full Stack Developer</h4>
                      <p className="text-text-secondary text-sm">Web3 Startup • 2021 - 2023</p>
                      <p className="text-sm mt-1">Developed and maintained MERN stack applications with blockchain integration.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background-dark rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-primary">Education</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">MSc Computer Science</h4>
                      <p className="text-text-secondary text-sm">Tech University • 2018 - 2020</p>
                    </div>
                    <div>
                      <h4 className="font-medium">BSc Computer Engineering</h4>
                      <p className="text-text-secondary text-sm">Engineering Institute • 2014 - 2018</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background-dark rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-primary">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">Solidity</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">React</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">Node.js</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">Express</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">MongoDB</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">TypeScript</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">EVM</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">Web3.js</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">Ethers.js</span>
                    <span className="bg-background-secondary text-sm px-2 py-1 rounded">Hardhat</span>
                  </div>
                </div>
              </div>
              
              {/* On-chain verification */}
              <div className="mt-6 bg-primary/10 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-primary">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  On-Chain Verification
                </h3>
                <div className="text-sm">
                  <p className="mb-1">NFT Contract Address: <span className="text-primary">0x123...abc</span></p>
                  <p>View on <a href="#" className="text-primary hover:underline">Sepolia Etherscan</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CvNftPage;
