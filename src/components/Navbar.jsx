import React from 'react';
import { Compass } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar-top">
      <div className="navbar-brand">
        <Compass size={24} className="animate-pulse-soft" />
        <span>SafarAI</span>
      </div>
    </header>
  );
}

