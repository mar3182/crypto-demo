import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Button, Card, CardBody, CardHeader, Progress, Tabs, Tab, Input } from '@nextui-org/react';

const LiveDAppsPage = () => {
  const { isConnected, connectWallet, isSepoliaNetwork, switchToSepolia } = useWallet();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("blockchain-poll");
  
  // Bingo game state
  const [buzzwordInput, setBuzzwordInput] = useState("");
  const [bingoWords, setBingoWords] = useState({
    "blockchain": false,
    "web3": false,
    "crypto": false,
    "token": false,
    "wallet": false,
    "nft": false,
    "defi": false,
    "dao": false,
    "metaverse": false,
    "node": false,
    "hash": false,
    "smart contract": false,
    "decentralized": false,
    "consensus": false,
    "mining": false,
    "gas": false
  });
  const [bingoAchieved, setBingoAchieved] = useState(false);
  const [bingoScore, setBingoScore] = useState(0);
  
  // Poll state
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
  
  // Handle buzzword input for the bingo game
  const handleBuzzwordInput = (e) => {
    setBuzzwordInput(e.target.value);
  };
  
  // Submit a buzzword for the bingo game
  const submitBuzzword = () => {
    const word = buzzwordInput.toLowerCase().trim();
    
    if (word in bingoWords && !bingoWords[word]) {
      const updatedWords = { ...bingoWords, [word]: true };
      setBingoWords(updatedWords);
      setBingoScore(bingoScore + 1);
      
      // Check if bingo is achieved (4 or more words found)
      if (bingoScore + 1 >= 4) {
        setBingoAchieved(true);
      }
      
      setBuzzwordInput("");
    }
  };
  
  // Reset the bingo game
  const resetBingo = () => {
    const resetWords = Object.keys(bingoWords).reduce((acc, word) => {
      acc[word] = false;
      return acc;
    }, {});
    
    setBingoWords(resetWords);
    setBingoScore(0);
    setBingoAchieved(false);
    setBuzzwordInput("");
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
        <div>
          <Tabs 
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            variant="bordered"
            classNames={{
              tab: "data-[selected=true]:text-primary data-[selected=true]:border-primary",
              cursor: "bg-primary",
              tabList: "border-gray-800"
            }}
          >
            <Tab key="blockchain-poll" title="Blockchain Poll">
              <Card className="bg-background-card mt-4">
                <CardHeader className="border-b border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold">Future of Web3 Poll</h2>
                </CardHeader>
                <CardBody>
                  <p className="mb-6">
                    Which area of Web3 do you think will see the most growth in the next year?
                    Your vote will be stored on the Sepolia blockchain.
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
                      
                      <div className="bg-background-dark rounded-lg p-4 mt-6">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                          </svg>
                          Transaction Details
                        </h4>
                        <div className="text-sm text-text-secondary space-y-1">
                          <p>Transaction Hash: <span className="text-primary">0x123...abc</span></p>
                          <p>Block: <span className="text-primary">12345678</span></p>
                          <p>View on <a href="#" className="text-primary hover:underline">Sepolia Etherscan</a></p>
                        </div>
                      </div>
                      
                      <div className="text-center mt-6">
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
            </Tab>
            
            <Tab key="buzzword-bingo" title="Buzzword Bingo">
              <Card className="bg-background-card mt-4">
                <CardHeader className="border-b border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold">Blockchain Buzzword Bingo</h2>
                </CardHeader>
                <CardBody>
                  <p className="mb-6">
                    Try to find blockchain buzzwords that you might hear in an interview.
                    Each found word is recorded on the Sepolia blockchain as a transaction.
                  </p>
                  
                  <div className="mb-6">
                    <div className="bg-background-dark p-4 rounded-lg mb-4">
                      <p className="font-semibold mb-2">Your Progress: {bingoScore} / 16 words found</p>
                      <Progress 
                        value={bingoScore} 
                        maxValue={16}
                        color="primary" 
                        size="md"
                        className="h-2"
                      />
                      {bingoAchieved && (
                        <div className="mt-4 p-2 bg-primary/20 border border-primary/30 rounded-lg text-center">
                          <p className="text-primary font-medium">🎉 Bingo! You found at least 4 buzzwords!</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                      {Object.entries(bingoWords).map(([word, found]) => (
                        <div 
                          key={word} 
                          className={`p-2 text-center text-sm rounded-lg border ${
                            found 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-gray-700 bg-background-secondary text-text-secondary'
                          }`}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mb-6">
                      <Input
                        type="text"
                        label="Enter a blockchain buzzword"
                        placeholder="e.g. blockchain, web3, defi"
                        value={buzzwordInput}
                        onChange={handleBuzzwordInput}
                        className="flex-1"
                      />
                      <Button 
                        color="primary" 
                        onClick={submitBuzzword}
                        isDisabled={!buzzwordInput.trim()}
                        className="bg-primary text-black font-semibold"
                      >
                        Submit
                      </Button>
                    </div>
                    
                    {bingoScore > 0 && (
                      <div className="text-center">
                        <Button 
                          color="default" 
                          variant="bordered" 
                          onClick={resetBingo}
                          className="text-text-secondary border-text-secondary"
                        >
                          Reset Game
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {bingoAchieved && (
                    <div className="bg-background-dark rounded-lg p-4 mt-6">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                        Achievement Details
                      </h4>
                      <div className="text-sm text-text-secondary space-y-1">
                        <p>Achievement: <span className="text-primary">Blockchain Buzzword Bingo Champion</span></p>
                        <p>Words Found: <span className="text-primary">{bingoScore}</span></p>
                        <p>This achievement can be minted as an SBT in the <a href="#" className="text-primary hover:underline">Achievements</a> page.</p>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Tab>
            
            <Tab key="roadmap" title="Job Roadmap" isDisabled>
              <Card className="bg-background-card mt-4">
                <CardHeader className="border-b border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold">Job Application Roadmap</h2>
                </CardHeader>
                <CardBody>
                  <p className="mb-6">
                    Coming soon: Create and agree on a roadmap for the job application process,
                    with all agreements stored on-chain for transparency.
                  </p>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default LiveDAppsPage;
  
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
