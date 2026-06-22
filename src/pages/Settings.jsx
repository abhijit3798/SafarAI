import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import { useNavigation } from '../hooks/useNavigation';
import Card from '../components/Card';
import Button from '../components/Button';
import BottomSheetSelector from '../components/BottomSheetSelector';
import { Info, Mail, ArrowLeft } from 'lucide-react';
import { APP_VERSION, SUPPORT_EMAIL } from '../config/constants';

export default function Settings() {
  const { navigateTo } = useNavigation() || {};
  const { themeMode, setThemeMode } = useTheme();
  const [currency, setCurrency] = useLocalStorage('safar_ai_currency', 'INR');
  const [notifications, setNotifications] = useLocalStorage('safar_ai_notifications', 'enabled');
  const [travelUnits, setTravelUnits] = useLocalStorage('safar_ai_travel_units', 'metric');

  // Bottom Sheet open/close states
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTravelUnitsOpen, setIsTravelUnitsOpen] = useState(false);

  const themeOptions = [
    { value: 'system', label: 'System', desc: 'Match your system preferences' },
    { value: 'light', label: 'Light', desc: 'Clean and bright mode' },
    { value: 'dark', label: 'Dark', desc: 'Vibrant dark appearance' }
  ];

  const currencyOptions = [
    { value: 'INR', label: 'INR (₹)', desc: 'Indian Rupee' },
    { value: 'USD', label: 'USD ($)', desc: 'United States Dollar' },
    { value: 'EUR', label: 'EUR (€)', desc: 'Euro' },
    { value: 'GBP', label: 'GBP (£)', desc: 'Great British Pound' }
  ];

  const notificationsOptions = [
    { value: 'enabled', label: 'Enabled', desc: 'Get real-time trip alerts' },
    { value: 'disabled', label: 'Disabled', desc: 'Mute all alerts' }
  ];

  const travelUnitsOptions = [
    { value: 'metric', label: 'Metric', desc: 'Kilometers and Celsius' },
    { value: 'imperial', label: 'Imperial', desc: 'Miles and Fahrenheit' }
  ];

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo('profile');
    }
  };

  const handleClearCache = () => {
    if (window.confirm("CAUTION: This will clear all saved trips, settings, and traveler profiles. Do you want to wipe the local database?")) {
      localStorage.clear();
      window.location.hash = 'splash';
      window.location.reload();
    }
  };

  return (
    <div 
      className="animate-fade-in" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        padding: '16px', 
        paddingTop: '0px', 
        boxSizing: 'border-box', 
        width: '100%',
        minHeight: '100%'
      }}
    >
      
      {/* Sticky Header */}
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 100, 
          background: 'var(--bg-primary)', 
          borderBottom: '1px solid var(--border-color)', 
          padding: '12px 16px', 
          margin: '0 -16px 10px -16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          paddingTop: 'calc(12px + env(safe-area-inset-top, 0px))', 
          boxSizing: 'border-box'
        }}
      >
        <button 
          onClick={handleBack}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            color: 'var(--color-primary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            marginLeft: '-8px'
          }}
          className="tap-scale"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          Settings
        </span>
      </div>

      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>Settings</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Configure app parameters and system variables.
        </p>
      </div>

      {/* App Preferences Card */}
      <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>
          App Preferences
        </h3>

        {/* Theme Setting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ flex: 1, marginRight: '12px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>Theme</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Select display theme color palette</span>
          </div>
          <button 
            type="button"
            className="form-input form-select"
            onClick={() => setIsThemeOpen(true)}
            style={{ 
              width: '130px', 
              padding: '6px 28px 6px 12px', 
              fontSize: '0.82rem', 
              height: '36px', 
              minHeight: 'auto', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            <span>{themeOptions.find(o => o.value === themeMode)?.label || themeMode}</span>
          </button>
        </div>

        {/* Currency Setting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ flex: 1, marginRight: '12px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>Currency</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Select preferred pricing currency</span>
          </div>
          <button 
            type="button"
            className="form-input form-select"
            onClick={() => setIsCurrencyOpen(true)}
            style={{ 
              width: '130px', 
              padding: '6px 28px 6px 12px', 
              fontSize: '0.82rem', 
              height: '36px', 
              minHeight: 'auto', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            <span>{currencyOptions.find(o => o.value === currency)?.label || currency}</span>
          </button>
        </div>

        {/* Notifications Setting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ flex: 1, marginRight: '12px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>Notifications</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Configure travel alerts & reminders</span>
          </div>
          <button 
            type="button"
            className="form-input form-select"
            onClick={() => setIsNotificationsOpen(true)}
            style={{ 
              width: '130px', 
              padding: '6px 28px 6px 12px', 
              fontSize: '0.82rem', 
              height: '36px', 
              minHeight: 'auto', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            <span>{notificationsOptions.find(o => o.value === notifications)?.label || notifications}</span>
          </button>
        </div>

        {/* Travel Units Setting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
          <div style={{ flex: 1, marginRight: '12px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>Travel Units</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Preferred metrics format</span>
          </div>
          <button 
            type="button"
            className="form-input form-select"
            onClick={() => setIsTravelUnitsOpen(true)}
            style={{ 
              width: '130px', 
              padding: '6px 28px 6px 12px', 
              fontSize: '0.82rem', 
              height: '36px', 
              minHeight: 'auto', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            <span>{travelUnitsOptions.find(o => o.value === travelUnits)?.label || travelUnits}</span>
          </button>
        </div>
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

      {/* Bottom Sheets */}
      <BottomSheetSelector 
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        title="Theme"
        options={themeOptions}
        selectedValue={themeMode}
        onChange={setThemeMode}
        searchable={false}
      />

      <BottomSheetSelector 
        isOpen={isCurrencyOpen}
        onClose={() => setIsCurrencyOpen(false)}
        title="Currency"
        options={currencyOptions}
        selectedValue={currency}
        onChange={setCurrency}
        searchable={false}
      />

      <BottomSheetSelector 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="Notifications"
        options={notificationsOptions}
        selectedValue={notifications}
        onChange={setNotifications}
        searchable={false}
      />

      <BottomSheetSelector 
        isOpen={isTravelUnitsOpen}
        onClose={() => setIsTravelUnitsOpen(false)}
        title="Travel Units"
        options={travelUnitsOptions}
        selectedValue={travelUnits}
        onChange={setTravelUnits}
        searchable={false}
      />

    </div>
  );
}
