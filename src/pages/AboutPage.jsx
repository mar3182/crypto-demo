import { Button } from '@nextui-org/react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">About This Demo</h1>
      
      <div className="bg-background-card rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
        <p className="mb-4">
          Crypto Oasis is an interactive hiring platform cleverly disguised as a crypto gaming platform. 
          It leverages the UI/UX design of a target "Multigaming Platform for NFT Communities" to create 
          an engaging experience for recruiters.
        </p>
        <p className="mb-4">
          The platform allows recruiters to mint "Developer Portfolio NFTs" to unlock the ability to create 
          skill-review challenges and collaboratively define a "Roadmap to Getting the Job" with the 
          developer, with key agreements recorded on the blockchain.
        </p>
        <p>
          This project serves as a comprehensive demonstration of full-stack (MERN) and blockchain (Solidity) 
          development capabilities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-background-card rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Frontend</h3>
              <ul className="list-disc list-inside space-y-1 text-text-secondary">
                <li>React (v18+)</li>
                <li>React Router DOM (v6+)</li>
                <li>Ethers.js for blockchain interactions</li>
                <li>Styled Components / Tailwind CSS</li>
                <li>NextUI component library</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Blockchain</h3>
              <ul className="list-disc list-inside space-y-1 text-text-secondary">
                <li>Solidity (v0.8.x)</li>
                <li>Hardhat development environment</li>
                <li>ERC-721 NFT standard</li>
                <li>Smart contract tests with Chai/Mocha</li>
                <li>Deployed on Sepolia testnet</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Backend (for off-chain data)</h3>
              <ul className="list-disc list-inside space-y-1 text-text-secondary">
                <li>Node.js with Express.js</li>
                <li>MongoDB</li>
                <li>IPFS for NFT metadata storage</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-background-card rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Core Features</h2>
          
          <div className="space-y-2 mb-6">
            <div className="p-3 bg-background-dark rounded flex items-start gap-3">
              <div className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-medium">Developer Portfolio NFT Minting</h4>
                <p className="text-sm text-text-secondary">
                  Recruiters mint themed NFTs on the Sepolia testnet, unlocking platform features.
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-background-dark rounded flex items-start gap-3">
              <div className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-medium">Challenge Creation</h4>
                <p className="text-sm text-text-secondary">
                  Portfolio NFT holders create skill-review challenges for the developer.
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-background-dark rounded flex items-start gap-3">
              <div className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-medium">"Roadmap to Getting the Job" Proposal</h4>
                <p className="text-sm text-text-secondary">
                  NFT holders propose multi-step roadmaps for the hiring process, with on-chain agreements.
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-background-dark rounded flex items-start gap-3">
              <div className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-medium">Interactive Skill Demos</h4>
                <p className="text-sm text-text-secondary">
                  Various interactive components showcase technical skills and knowledge.
                </p>
              </div>
            </div>
          </div>
          
          <a 
            href="https://github.com/yourusername/crypto-oasis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button 
              color="default" 
              variant="bordered" 
              className="w-full text-text-secondary border-text-secondary hover:text-primary hover:border-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View GitHub Repository
            </Button>
          </a>
        </div>
      </div>
      
      <div className="bg-background-card rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Is this a real gaming platform?</h3>
            <p className="text-text-secondary">
              No, this is a portfolio demonstration project designed to showcase full-stack and blockchain development skills.
              The UI is inspired by a gaming platform design, but repurposed as an interactive hiring tool.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Do I need real ETH to use this platform?</h3>
            <p className="text-text-secondary">
              No, this platform runs on the Sepolia testnet, which uses test ETH that has no real value.
              You can get free Sepolia ETH from various faucets to interact with the platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">How do I mint a Developer Portfolio NFT?</h3>
            <p className="text-text-secondary">
              Connect your wallet (MetaMask) to the Sepolia testnet, navigate to the CV NFT page,
              and click the "Mint Developer Portfolio NFT" button. You'll need some Sepolia test ETH.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Can I see the smart contract code?</h3>
            <p className="text-text-secondary">
              Yes, all smart contracts are available in the GitHub repository, including the NFT contracts 
              and the Job Roadmap contracts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
