import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useWallet } from '../contexts/WalletContext';
import ShowcaseCard from '../components/ui/ShowcaseCard';

const HomePage = () => {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();

  // Data for showcase cards
  const showcaseCards = [
    {
      id: 1,
      image: '/images/cv-nft-avatar-experience.png',
      title: 'My Decentralized CV',
      details: [
        { label: 'Type', value: 'ERC-721 NFT' },
        { label: 'Focus', value: 'On-Chain Identity, Metadata' },
        { label: 'Skills', value: 'Solidity, IPFS' }
      ],
      buttonText: 'View CV Details',
      onClick: () => navigate('/cv-nft')
    },
    {
      id: 2,
      image: '/images/Rectangle 967.png',
      title: 'Interactive Skill Quiz',
      details: [
        { label: 'Type', value: 'Frontend Challenge' },
        { label: 'Focus', value: 'React, State Management' },
        { label: 'Topics', value: 'JavaScript/Solidity' }
      ],
      buttonText: 'Try the Quiz',
      onClick: () => navigate('/skill-demos')
    },
    {
      id: 3,
      image: '/images/Rectangle 1335.png',
      title: 'Live Blockchain Poll',
      details: [
        { label: 'Type', value: 'On-Chain DApp' },
        { label: 'Focus', value: 'Smart Contracts, Ethers.js' },
        { label: 'Network', value: 'Sepolia Testnet' }
      ],
      buttonText: 'Participate Now',
      onClick: () => navigate('/live-dapps')
    },
    {
      id: 4,
      image: '/images/Rectangle 1349.png',
      title: 'Verifiable Achievements (SBTs)',
      details: [
        { label: 'Type', value: 'Soul-Bound Tokens' },
        { label: 'Focus', value: 'Digital Credentials' },
        { label: 'Concept', value: 'Skill Verification' }
      ],
      buttonText: 'View My SBTs',
      onClick: () => navigate('/achievements')
    }
  ];

  return (
    <div className="bg-background-dark">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="container mx-auto text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Crypto Oasis: An Interactive Full-Stack & Blockchain Portfolio
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-text-secondary">
            Showcasing MERN & Solidity development skills through interactive DApps, an on-chain CV, and skill demonstrations.
          </p>
          <Button 
            size="lg"
            color="primary" 
            onClick={() => navigate('/cv-nft')}
            className="text-lg px-8 py-6 bg-primary text-black font-semibold"
          >
            Explore My Profile & CV NFT
          </Button>
        </div>
        
        {/* Background Elements - can add abstract shapes/patterns if desired */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Showcase Cards Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Featured Portfolio Showcases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseCards.map(card => (
              <ShowcaseCard 
                key={card.id}
                image={card.image}
                title={card.title}
                details={card.details}
                buttonText={card.buttonText}
                onClick={card.onClick}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              color="default" 
              variant="bordered"
              onClick={() => navigate('/about')}
              className="text-text-secondary border-text-secondary hover:text-primary hover:border-primary"
            >
              Explore All Features
            </Button>
          </div>
        </div>
      </section>

      {/* Wallet Connection Section - shown only if wallet is not connected */}
      {!isConnected && (
        <section className="py-16 px-6 bg-background-secondary">
          <div className="container mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Connect Your Wallet</h3>
            <p className="mb-8 text-text-secondary">
              Connect your wallet to interact with DApps and on-chain features of this portfolio.
            </p>
            <Button 
              color="primary" 
              size="lg"
              onClick={connectWallet}
              className="bg-primary text-black font-semibold"
            >
              Connect MetaMask
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
