import React from 'react';
import { Home, Sparkles, Bookmark, User } from 'lucide-react';

export default function BottomNav({ currentTab, onChangeTab }) {
  const tabs = [
    { id: 'home', label: 'Inspiration', icon: Home },
    { id: 'planner', label: 'Build Trip', icon: Sparkles },
    { id: 'saved', label: 'Saved Trips', icon: Bookmark },
    { id: 'profile', label: 'Settings', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
          >
            <div className="bottom-nav-icon-wrapper">
              <IconComponent size={20} />
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
