import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChallengeProvider } from './context/ChallengeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { CitizenReportPage } from './pages/CitizenReportPage';
import { GovernmentDashboardPage } from './pages/GovernmentDashboardPage';
import { UniversityWorkspacePage } from './pages/UniversityWorkspacePage';
import { ChallengesListPage } from './pages/ChallengesListPage';
import { ImpactAnalyticsPage } from './pages/ImpactAnalyticsPage';
import { LoginPage } from './pages/LoginPage';
import { PresentationPage } from './pages/PresentationPage';
import { CivicChatbot } from './components/chat/CivicChatbot';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-14">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<Navigate to="/#challenges-map" replace />} />
          <Route path="/report" element={<CitizenReportPage />} />
          <Route path="/challenges" element={<ChallengesListPage />} />
          <Route path="/admin" element={<GovernmentDashboardPage />} />
          <Route path="/workspace" element={<UniversityWorkspacePage />} />
          <Route path="/impact" element={<ImpactAnalyticsPage />} />
          <Route path="/presentation" element={<PresentationPage />} />
          <Route path="/deck" element={<Navigate to="/presentation" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
      <CivicChatbot />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChallengeProvider>
        <Router>
          <AppContent />
        </Router>
      </ChallengeProvider>
    </AuthProvider>
  );
};

export default App;