import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Button, Card, CardBody, CardHeader, Progress } from '@nextui-org/react';

const LiveDAppsPage = () => {
  const { isConnected, connectWallet, isSepoliaNetwork, switchToSepolia } = useWallet();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollResults, setPollResults] = useState({
    options: [
      { id: 1, text: "DeFi (Decentralized Finance)", votes: 45 },
      { id: 2, text: "NFTs and Digital Collectibles", votes: 28 },
      { id: 3, text: "DAOs (Decentralized Autonomous Organizations)", votes: 19 },
      { id: 4, text: "GameFi (Gaming + DeFi)", votes: 34 }
    ],
    totalVotes: 126
  });
  
  // Simulated voting function - in a real app, this would interact with a smart contract
  const vote = () => {
    if (selectedOption !== null) {
      // Simulate updating the vote count
      const updatedOptions = pollResults.options.map(option => {
        if (option.id === selectedOption) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });
      
      setPollResults({
        options: updatedOptions,
        totalVotes: pollResults.totalVotes + 1
      });
      
      setHasVoted(true);
      setSelectedOption(null);
    }
  };
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">Live DApps</h1>
      
      {!isConnected ? (
        <div className="bg-background-card rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="mb-6 text-text-secondary">
            Connect your wallet to interact with live DApps running on the Sepolia testnet.
          </p>
          <Button 
            color="primary" 
            onClick={connectWallet}
            className="bg-primary text-black font-semibold"
          >
            Connect MetaMask
          </Button>
        </div>
      ) : !isSepoliaNetwork ? (
        <div className="bg-background-card rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Switch to Sepolia Network</h2>
          <p className="mb-6 text-text-secondary">
            These DApps run on the Sepolia testnet. Please switch your wallet to the Sepolia network.
          </p>
          <Button 
            color="primary" 
            onClick={switchToSepolia}
            className="bg-primary text-black font-semibold"
          >
            Switch to Sepolia
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-background-card">
            <CardHeader className="border-b border-gray-800 pb-4">
              <h2 className="text-2xl font-bold">Blockchain Poll: Future of Web3</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-6">
                Which area of Web3 do you think will see the most growth in the next year?
              </p>
              
              {hasVoted ? (
                <div className="space-y-6">
                  <h3 className="font-semibold">Current Results ({pollResults.totalVotes} votes):</h3>
                  
                  {pollResults.options.map(option => {
                    const percentage = Math.round((option.votes / pollResults.totalVotes) * 100);
                    
                    return (
                      <div key={option.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{option.text}</span>
                          <span className="text-primary">{percentage}% ({option.votes} votes)</span>
                        </div>
                        <Progress 
                          value={percentage} 
                          color="primary" 
                          size="md"
                          className="h-2"
                        />
                      </div>
                    );
                  })}
                  
                  <div className="text-center mt-6">
                    <p className="text-text-secondary mb-4">Thank you for participating in this poll!</p>
                    <Button 
                      color="default" 
                      variant="bordered" 
                      onClick={() => setHasVoted(false)}
                      className="text-text-secondary border-text-secondary"
                    >
                      Vote Again
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {pollResults.options.map(option => (
                    <div 
                      key={option.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedOption === option.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedOption(option.id)}
                    >
                      {option.text}
                    </div>
                  ))}
                  
                  <Button 
                    color="primary" 
                    onClick={vote}
                    isDisabled={selectedOption === null}
                    className="w-full mt-4 bg-primary text-black font-semibold"
                  >
                    Submit Vote
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
          
          <Card className="bg-background-card">
            <CardHeader className="border-b border-gray-800 pb-4">
              <h2 className="text-2xl font-bold">Interview Buzzword Bingo</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-6">
                Play a fun game of "Tech Interview Buzzword Bingo" where each word found is stored as a transaction on the Sepolia testnet.
              </p>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {Array(25).fill().map((_, index) => {
                  const buzzwords = [
                    "Blockchain", "Scalable", "Web3", "DeFi", "Metaverse",
                    "AI/ML", "Cloud", "DevOps", "Agile", "Microservices",
                    "API", "React", "MERN", "Fullstack", "Responsive",
                    "Algorithm", "Serverless", "Containerized", "CI/CD", "Node.js",
                    "Optimization", "Solidity", "Smart Contract", "NFT", "DAO"
                  ];
                  
                  return (
                    <div 
                      key={index} 
                      className="aspect-square flex items-center justify-center p-1 text-xs md:text-sm border border-gray-700 bg-background-secondary rounded-md"
                    >
                      {buzzwords[index]}
                    </div>
                  );
                })}
              </div>
              
              <Button 
                color="primary" 
                className="w-full bg-background-secondary text-text-secondary border border-gray-700"
                isDisabled
              >
                <span className="absolute inset-0 flex items-center justify-center">
                  Coming Soon
                </span>
              </Button>
            </CardBody>
          </Card>
          
          <Card className="bg-background-card md:col-span-2">
            <CardHeader className="border-b border-gray-800 pb-4">
              <h2 className="text-2xl font-bold">Roadmap to Getting the Job - Proposal Tool</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-6">
                Propose a multi-step roadmap for the hiring process. Once the developer agrees, 
                the agreement will be recorded on the Sepolia blockchain.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Step 1: Technical Interview</h3>
                  <p className="text-sm">Initial technical assessment focused on core technologies from the portfolio.</p>
                </div>
                
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Step 2: Take-Home Challenge</h3>
                  <p className="text-sm">A small project or code review challenge to demonstrate practical skills.</p>
                </div>
                
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Step 3: Team Interview</h3>
                  <p className="text-sm">Meet the team to discuss collaboration, workflows, and company culture.</p>
                </div>
                
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Step 4: Final Decision & Offer</h3>
                  <p className="text-sm">Discussion of compensation, benefits, and start date if selected.</p>
                </div>
              </div>
              
              <Button 
                color="primary" 
                className="w-full bg-background-secondary text-text-secondary border border-gray-700"
                isDisabled
              >
                <span className="absolute inset-0 flex items-center justify-center">
                  Coming Soon
                </span>
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LiveDAppsPage;
