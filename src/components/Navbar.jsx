import React from 'react';
import { Compass, Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar-top">
      <div className="navbar-brand">
        <Compass size={24} className="animate-pulse-soft" />
        <span>SafarAI</span>
      </div>
      <button 
        className="btn-icon" 
        onClick={onToggleTheme} 
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
