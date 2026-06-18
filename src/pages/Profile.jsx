import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigation } from '../hooks/useNavigation';
import usePWA from '../hooks/usePWA';
import useTheme from '../hooks/useTheme';
import Card from '../components/Card';
import Button from '../components/Button';
import BottomSheetSelector from '../components/BottomSheetSelector';
import { User, Award, Settings, Bookmark, Crown, ChevronRight, Check, Compass, Sun, Moon } from 'lucide-react';

export default function Profile() {
  const { navigateTo } = useNavigation();
  const { isInstallable, triggerInstall } = usePWA();
  const { theme, toggleTheme } = useTheme();
  const [savedTrips] = useLocalStorage('safar_ai_saved_trips', []);
  const [createdCount] = useLocalStorage('safar_ai_created_count', 0);
  const [isPremium] = useLocalStorage('safar_ai_premium_status', false);

  const [prefBudget, setPrefBudget] = useLocalStorage('safar_ai_pref_budget', 'Moderate');
  const [prefVibe, setPrefVibe] = useLocalStorage('safar_ai_pref_vibe', 'Leisure');

  const [tempBudget, setTempBudget] = useState(prefBudget);
  const [tempVibe, setTempVibe] = useState(prefVibe);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Selector bottom sheet open state
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isVibeOpen, setIsVibeOpen] = useState(false);

  useEffect(() => {
    setTempBudget(prefBudget);
    setTempVibe(prefVibe);
  }, [prefBudget, prefVibe]);

  const handleSavePreferences = () => {
    setPrefBudget(tempBudget);
    setPrefVibe(tempVibe);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getExplorerTitle = (count) => {
    if (count === 0) return "Novice Nomad";
    if (count <= 2) return "Wanderer";
    if (count <= 5) return "Voyager";
    return "Globetrotter";
  };

  const budgetOptions = [
    { value: 'Budget', label: 'Budget', desc: 'Hostels & street food' },
    { value: 'Moderate', label: 'Moderate', desc: '3-star hotels & cabs' },
    { value: 'Luxury', label: 'Luxury', desc: '5-star resorts & flights' }
  ];

  const vibeOptions = [
    { value: 'Leisure', label: 'Leisure', desc: 'Relaxing & beach' },
    { value: 'Adventure', label: 'Adventure', desc: 'Sports & mountains' },
    { value: 'Cultural', label: 'Cultural', desc: 'Sightseeing & heritage' },
    { value: 'Spiritual', label: 'Spiritual', desc: 'Temples & rituals' },
    { value: 'Family', label: 'Family', desc: 'Family-friendly spots' },
    { value: 'Solo', label: 'Solo', desc: 'Solo exploring' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* 1. Profile Header card with Avatar */}
      <Card 
        style={{ 
          background: 'var(--grad-primary)', 
          color: 'white',
          padding: '24px 20px',
          boxShadow: 'var(--shadow-indigo)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div 
          style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <User size={32} color="white" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', margin: 0 }}>Guest Explorer</h2>
            {isPremium && <Crown size={16} style={{ color: 'var(--color-warning)' }} fill="currentColor" />}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.78rem', color: '#e0e7ff', fontWeight: '700' }}>
            <Award size={14} />
            <span>{getExplorerTitle(createdCount)} • Level {Math.min(5, Math.floor(createdCount / 2) + 1)}</span>
          </div>
        </div>
      </Card>

      {/* 2. User Travel Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <Card style={{ padding: '16px', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-primary)', display: 'block' }}>{createdCount}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Trips Created</span>
        </Card>
        <Card style={{ padding: '16px', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-secondary)', display: 'block' }}>{savedTrips.length}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Saved Archive</span>
        </Card>
      </div>

      {/* 3. PWA Installation Banner */}
      {isInstallable && (
        <Card 
          style={{ 
            borderColor: 'var(--color-primary-light)', 
            background: 'var(--bg-accent)',
            textAlign: 'center',
            padding: '20px',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '4px' }}>
            SafarAI Web App
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.4' }}>
            Install SafarAI on your home screen for quick offline-capable launch and clean mobile shell framing.
          </p>
          <Button onClick={triggerInstall} variant="primary" style={{ width: '100%', borderRadius: 'var(--radius-md)' }}>
            Install Application
          </Button>
        </Card>
      )}

      {/* 4. Quick Nav list */}
      <Card style={{ padding: '0px', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        <div 
          onClick={() => navigateTo('saved')}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: '700' }}>
            <Bookmark size={16} className="text-secondary" style={{ color: 'var(--color-primary)' }} />
            <span>My Saved Itineraries ({savedTrips.length})</span>
          </div>
          <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
        </div>
        
        <div 
          onClick={() => navigateTo('settings')}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: '700' }}>
            <Settings size={16} className="text-secondary" style={{ color: 'var(--color-secondary)' }} />
            <span>Settings & Preferences</span>
          </div>
          <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
        </div>
      </Card>

      {/* 5. Planning Mode Card */}
      <Card style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)' }}>Planning Mode</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '12px', 
            borderRadius: 'var(--radius-sm)', 
            border: '2px solid var(--color-primary)', 
            background: 'var(--bg-accent)' 
          }}>
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>Quick Planner</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Generate plans offline instantly using mock templates</span>
            </div>
            <Check size={18} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '12px', 
            borderRadius: 'var(--radius-sm)', 
            border: '1px dashed var(--border-color)', 
            opacity: 0.6,
            background: 'var(--bg-secondary)' 
          }}>
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block' }}>Smart AI (Coming Soon)</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Live AI model generation</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 6. Theme Settings Card */}
      <Card style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)' }}>Preferences</h3>
        
        {/* iOS Theme Switch */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
          <div>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>Dark Theme</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Reduce glare and conserve mobile battery</span>
          </div>
          <label className="ios-switch-label">
            <input 
              type="checkbox" 
              className="ios-switch-input" 
              checked={theme === 'dark'} 
              onChange={toggleTheme} 
            />
            <span className="ios-switch-slider"></span>
          </label>
        </div>
      </Card>

      {/* 6. Travel Preferences Custom Form */}
      <Card glass style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>Default Trip Config</h3>
        
        {/* Budget tier bottom sheet selector */}
        <div className="form-group">
          <label className="form-label" style={{ fontSize: '0.75rem' }}>Default Budget Tier</label>
          <button
            type="button"
            className="form-input"
            onClick={() => setIsBudgetOpen(true)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              width: '100%',
              cursor: 'pointer',
              minHeight: '44px'
            }}
          >
            <span>{tempBudget}</span>
            <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
          </button>

          <BottomSheetSelector
            isOpen={isBudgetOpen}
            onClose={() => setIsBudgetOpen(false)}
            title="Default Budget Tier"
            options={budgetOptions}
            selectedValue={tempBudget}
            onChange={(val) => setTempBudget(val)}
            searchable={false}
          />
        </div>

        {/* Travel Vibe bottom sheet selector */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ fontSize: '0.75rem' }}>Default Travel Vibe</label>
          <button
            type="button"
            className="form-input"
            onClick={() => setIsVibeOpen(true)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              width: '100%',
              cursor: 'pointer',
              minHeight: '44px'
            }}
          >
            <span>{tempVibe}</span>
            <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
          </button>

          <BottomSheetSelector
            isOpen={isVibeOpen}
            onClose={() => setIsVibeOpen(false)}
            title="Default Travel Vibe"
            options={vibeOptions}
            selectedValue={tempVibe}
            onChange={(val) => setTempVibe(val)}
            searchable={false}
          />
        </div>

        <Button onClick={handleSavePreferences} variant="primary" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)' }}>
          <span>Save Preferences</span>
        </Button>

        {saveSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: '600', marginTop: '12px', justifyContent: 'center' }}>
            <Check size={14} />
            <span>Preferences saved successfully!</span>
          </div>
        )}
      </Card>

    </div>
  );
}
