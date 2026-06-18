import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Sun, Moon, Info, Mail } from 'lucide-react';
import { APP_VERSION, SUPPORT_EMAIL } from '../config/constants';

export default function Settings() {
  const { theme, toggleTheme, isDark } = useTheme();
  // Settings functionality is simplified for offline-only mode.

  const handleClearCache = () => {
    if (window.confirm("CAUTION: This will clear all saved trips, settings, and traveler profiles. Do you want to wipe the local database?")) {
      localStorage.clear();
      window.location.hash = 'splash';
      window.location.reload();
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>Settings</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Configure app parameters and system variables.
        </p>
      </div>

      {/* Theme Toggle Card */}
      <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Dark Theme Mode</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Toggle styling accents
          </p>
        </div>
        
        <Button onClick={toggleTheme} variant="icon" style={{ width: '44px', height: '44px' }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </Card>



      {/* Info / Support Card */}
      <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={18} style={{ color: 'var(--color-secondary)' }} />
          <span>About SafarAI</span>
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Version</span>
            <strong>{APP_VERSION}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Target Platform</span>
            <strong>Android PWA WebView</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Scope</span>
            <strong>India Travel (v1)</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <Mail size={14} />
          <span>Support:</span>
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
            {SUPPORT_EMAIL}
          </a>
        </div>
      </Card>

      {/* Reset System Card */}
      <Card style={{ borderColor: 'rgba(244, 63, 94, 0.2)', background: 'rgba(244, 63, 94, 0.02)' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-accent)', marginBottom: '4px' }}>
          Danger Zone
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
          Perform a factory reset of the local app environment. All saved travel documents will be erased.
        </p>
        <Button onClick={handleClearCache} variant="text" style={{ padding: 0, color: 'var(--color-accent)', fontWeight: '700', fontSize: '0.8rem' }}>
          Wipe App Cache & Settings
        </Button>
      </Card>

    </div>
  );
}
