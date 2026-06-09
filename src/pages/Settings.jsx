import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Key, Eye, EyeOff, Save, Trash2, Sun, Moon, Info, HelpCircle, Mail, Globe, Check } from 'lucide-react';
import { APP_VERSION, SUPPORT_EMAIL } from '../config/constants';

export default function Settings() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('safar_ai_gemini_key') || '';
    setApiKey(key);
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      if (!apiKey.startsWith('AIzaSy')) {
        alert("Warning: Gemini API keys typically start with 'AIzaSy'. Make sure your key is formatted correctly.");
      }
      localStorage.setItem('safar_ai_gemini_key', apiKey.trim());
      setSaveMsg("API Key configured!");
    } else {
      localStorage.removeItem('safar_ai_gemini_key');
      setSaveMsg("API Key cleared.");
    }
    setTimeout(() => setSaveMsg(''), 3000);
  };

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

      {/* Gemini Key Config Card */}
      <Card glass>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={18} style={{ color: 'var(--color-primary-light)' }} />
          <span>Gemini AI Key <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-secondary)', marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', background: 'var(--border-color)' }}>Optional</span></span>
        </h3>
        
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
          An API Key is <strong>optional</strong>. It is only required to enable the premium <strong>Smart AI Planner</strong>. If left blank, SafarAI uses the built-in <strong>Quick Planner</strong>, which automatically generates customized day-wise itineraries, travel tips, transport, and budget recommendations locally without external AI calls.
        </p>

        <div className="form-group" style={{ marginBottom: '12px' }}>
          <div className="input-container">
            <Key size={16} className="input-icon" />
            <input
              type={showKey ? 'text' : 'password'}
              className="form-input"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ fontSize: '0.9rem', paddingRight: '48px', paddingLeft: '42px' }}
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              style={{ position: 'absolute', right: '14px', color: 'var(--text-secondary)', background: 'none' }}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <Button onClick={handleSaveKey} variant="primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Save size={14} />
            <span>{apiKey ? 'Save Key' : 'Clear Key'}</span>
          </Button>

          <a 
            href="https://aistudio.google.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '600' }}
          >
            <span>Get Free Key</span>
            <Globe size={12} />
          </a>
        </div>

        {saveMsg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: '600', marginTop: '12px' }}>
            <Check size={14} />
            <span>{saveMsg}</span>
          </div>
        )}
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
