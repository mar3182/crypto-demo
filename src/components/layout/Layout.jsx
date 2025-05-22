import { Outlet } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { isConnected, address, connectWallet } = useWallet();
  
  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-text-primary">
      <Header 
        walletConnected={isConnected} 
        walletAddress={address}
        onConnectWallet={connectWallet}
      />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
