import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

/**
 * Reusable App Layout Shell.
 * Integrates top Navbar, responsive BottomNav, and holds page content container.
 */
export default function Layout({
  children,
  currentTab,
  onChangeTab,
  theme,
  onToggleTheme
}) {
  return (
    <div className="app-container">
      {/* Top Header - Visible on Mobile */}
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      {/* Main Content Pane */}
      <main className="main-content">
        {children}
      </main>

      {/* Bottom Nav / Sidebar - Swaps based on Viewport */}
      <BottomNav currentTab={currentTab} onChangeTab={onChangeTab} />
    </div>
  );
}
