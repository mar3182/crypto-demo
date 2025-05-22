import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useWallet } from '../../contexts/WalletContext';

const Header = ({ walletConnected, walletAddress, onConnectWallet }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { disconnectWallet } = useWallet();

  return (
    <header className="bg-background-dark py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          CRYPTO OASIS
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white hover:text-primary">Dashboard</Link>
          <Link to="/cv-nft" className="text-white hover:text-primary">My CV NFT</Link>
          <Link to="/skill-demos" className="text-white hover:text-primary">Skill Demos</Link>
          <Link to="/live-dapps" className="text-white hover:text-primary">Live DApps</Link>
          <Link to="/about" className="text-white hover:text-primary">About This Demo</Link>
          
          {walletConnected ? (
            <div className="relative group">
              <button className="text-primary flex items-center gap-1">
                {walletAddress && `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-background-card rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/achievements" className="block px-4 py-2 text-sm text-white hover:bg-primary hover:text-black">
                  My Achievements
                </Link>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-primary hover:text-black"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          ) : (
            <Button 
              color="primary" 
              onClick={onConnectWallet}
              className="bg-primary text-black font-medium"
            >
              Connect Wallet
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background-card md:hidden">
            <nav className="flex flex-col p-4">
              <Link to="/" className="py-2 text-white hover:text-primary">Dashboard</Link>
              <Link to="/cv-nft" className="py-2 text-white hover:text-primary">My CV NFT</Link>
              <Link to="/skill-demos" className="py-2 text-white hover:text-primary">Skill Demos</Link>
              <Link to="/live-dapps" className="py-2 text-white hover:text-primary">Live DApps</Link>
              <Link to="/about" className="py-2 text-white hover:text-primary">About This Demo</Link>
              
              {walletConnected ? (
                <>
                  <div className="py-2 text-primary">
                    {walletAddress && `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                  </div>
                  <Link to="/achievements" className="py-2 text-white hover:text-primary">
                    My Achievements
                  </Link>
                  <button 
                    className="py-2 text-left text-white hover:text-primary"
                    onClick={disconnectWallet}
                  >
                    Disconnect Wallet
                  </button>
                </>
              ) : (
                <Button 
                  color="primary" 
                  onClick={onConnectWallet}
                  className="mt-2 bg-primary text-black font-medium"
                >
                  Connect Wallet
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
