import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { WalletProvider } from './contexts/WalletContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CvNftPage from './pages/CvNftPage';
import SkillDemosPage from './pages/SkillDemosPage';
import LiveDAppsPage from './pages/LiveDAppsPage';
import AboutPage from './pages/AboutPage';
import AchievementsPage from './pages/AchievementsPage';
import './App.css';

function App() {
  return (
    <NextUIProvider>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="cv-nft" element={<CvNftPage />} />
              <Route path="skill-demos" element={<SkillDemosPage />} />
              <Route path="live-dapps" element={<LiveDAppsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </WalletProvider>
    </NextUIProvider>
  );
}

export default App;