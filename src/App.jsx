import React, { Suspense } from 'react';
import { NavigationProvider, useNavigation } from './hooks/useNavigation';
import useTheme from './hooks/useTheme';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Static loaded page components to stabilize module loading
import Splash from './pages/Splash';
import Home from './pages/Home';
import TripPlanner from './pages/TripPlanner';
import GeneratedTrip from './pages/GeneratedTrip';
import TripHistory from './pages/TripHistory';
import Premium from './pages/Premium';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function AppContent() {
  const { currentPath, navigateTo } = useNavigation();
  const { theme, toggleTheme } = useTheme();

  // Page Routing Switch
  const renderPage = () => {
    switch (currentPath) {
      case 'splash':
        return <Splash />;
      case 'home':
        return <Home />;
      case 'planner':
        return <TripPlanner />;
      case 'trip-result':
      case 'generated-trip':
        return <GeneratedTrip />;
      case 'saved':
        return <TripHistory />;
      case 'premium':
        return <Premium />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const isSplash = currentPath === 'splash';

  // Suspense lazy-chunk loading indicator
  const suspenseFallback = (
    <div 
      style={{ 
        display: 'flex', 
        height: '60vh', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div 
        className="loader-outer-ring" 
        style={{ width: '40px', height: '40px', borderTopColor: 'var(--color-primary)' }}
      ></div>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Loading Page...</span>
    </div>
  );

  // Splash screen gets full viewport representation without shell frames
  if (isSplash) {
    return (
      <div className="main-content" style={{ maxWidth: '640px', margin: '0 auto', padding: '16px' }}>
        <Suspense fallback={suspenseFallback}>
          <ErrorBoundary>
            {renderPage()}
          </ErrorBoundary>
        </Suspense>
      </div>
    );
  }

  // Helper map: highlights the correct BottomNav tab item based on the hash path
  const tabMap = {
    'home': 'home',
    'planner': 'planner',
    'generated-trip': 'planner', // Stay on planner tab when details are open
    'trip-result': 'planner',
    'saved': 'saved',
    'premium': 'premium',
    'profile': 'profile',
    'settings': 'profile'
  };

  const currentTab = tabMap[currentPath] || 'home';

  const handleTabChange = (tabId) => {
    navigateTo(tabId);
  };

  return (
    <Layout
      currentTab={currentTab}
      onChangeTab={handleTabChange}
      theme={theme}
      onToggleTheme={toggleTheme}
    >
      <Suspense fallback={suspenseFallback}>
        <ErrorBoundary>
          {renderPage()}
        </ErrorBoundary>
      </Suspense>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ErrorBoundary>
  );
}
