import { useWallet } from '../contexts/WalletContext';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react';

const AchievementsPage = () => {
  const { isConnected, connectWallet } = useWallet();
  
  // Sample achievements (SBTs)
  const achievements = [
    {
      id: 1,
      title: 'JavaScript Expert',
      description: 'Demonstrated advanced JavaScript knowledge through interactive coding challenges.',
      image: '/images/Rectangle 1349.png',
      tokenId: '0001',
      dateAwarded: '2025-05-15',
      verified: true
    },
    {
      id: 2,
      title: 'Solidity Developer',
      description: 'Successfully deployed and verified smart contracts on Sepolia testnet.',
      image: '/images/Rectangle 967-1.png',
      tokenId: '0002',
      dateAwarded: '2025-05-18',
      verified: true
    },
    {
      id: 3,
      title: 'Full-Stack Blockchain Developer',
      description: 'Created and deployed complete dApps with both frontend and smart contract components.',
      image: '/images/Rectangle 967-2.png',
      tokenId: '0003',
      dateAwarded: '2025-05-20',
      verified: false,
      status: 'Pending verification'
    }
  ];
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">My Achievements (SBTs)</h1>
      
      {!isConnected ? (
        <div className="bg-background-card rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="mb-6 text-text-secondary">
            Connect your wallet to view your Soul-Bound Token achievements.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map(achievement => (
            <Card key={achievement.id} className="bg-background-card">
              <CardHeader className="flex gap-3 px-6 pt-6 pb-0">
                <div className="flex flex-col">
                  <p className="text-xl font-bold text-white">{achievement.title}</p>
                  <p className="text-small text-text-secondary">
                    Token ID: {achievement.tokenId}
                  </p>
                </div>
              </CardHeader>
              <CardBody className="px-6 py-4">
                <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-text-secondary">{achievement.description}</p>
              </CardBody>
              <Divider/>
              <CardFooter className="flex justify-between px-6">
                <p className="text-small text-text-secondary">
                  Awarded: {achievement.dateAwarded}
                </p>
                <div className={`flex items-center ${achievement.verified ? 'text-green-500' : 'text-yellow-500'}`}>
                  {achievement.verified ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                      <span>{achievement.status}</span>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Admin Section - Only visible in development for demo purposes */}
      {isConnected && process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-6 bg-background-card rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Admin: SBT Mint Demo</h2>
          <p className="mb-6 text-text-secondary">
            This section is for demonstration purposes only. In a real implementation, 
            this would be restricted to admin addresses and would allow minting of new 
            SBTs to users after they have successfully completed challenges.
          </p>
          <Button 
            color="primary" 
            className="bg-primary text-black font-semibold"
          >
            Mint New Achievement SBT
          </Button>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
