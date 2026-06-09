import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { APP_NAME, APP_TAGLINE } from '../config/constants';

export default function Splash() {
  const { navigateTo } = useNavigation();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out the screen slightly before navigation (at 1.75s)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1750);

    // Perform routing transition at exactly 2 seconds
    const navTimer = setTimeout(() => {
      navigateTo('home');
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigateTo]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ffffff', // Forced white background
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 250ms ease-out', // Smooth fade transition
        opacity: isFading ? 0 : 1,
        padding: '24px',
        textAlign: 'center'
      }}
    >
      {/* Visual Logo Placeholder with rotating loader */}
      <div 
        style={{ 
          position: 'relative', 
          width: '110px', 
          height: '110px', 
          marginBottom: '28px' 
        }}
      >
        {/* Spinning Outer Ring (Primary Blue) */}
        <div 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '3px solid #f1f5f9',
            borderTopColor: '#2563EB', // Primary color
            borderBottomColor: '#2563EB',
            animation: 'rotateSlow 1.4s linear infinite'
          }} 
        />
        
        {/* Inner static card containing icon */}
        <div 
          style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            backgroundColor: '#eff6ff', // Light blue fill
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8)'
          }}
        >
          <Compass 
            size={40} 
            style={{ 
              color: '#2563EB', // Primary Blue
              animation: 'pulse-soft 2s infinite ease-in-out' 
            }} 
          />
        </div>
      </div>

      {/* Brand Name */}
      <h1 
        style={{ 
          fontFamily: 'var(--font-heading)',
          fontSize: '2.6rem', 
          fontWeight: '800', 
          color: '#0F172A', // Secondary slate color
          marginBottom: '6px',
          letterSpacing: '-0.02em',
          lineHeight: '1.2'
        }}
      >
        {APP_NAME}
      </h1>
      
      {/* Tagline */}
      <p 
        style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem', 
          color: '#475569', // Muted secondary text
          fontWeight: '500'
        }}
      >
        {APP_TAGLINE}
      </p>

      {/* Tiny Progress Loader Bar */}
      <div 
        style={{ 
          position: 'absolute',
          bottom: '40px',
          width: '120px',
          height: '4px',
          backgroundColor: '#f1f5f9',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            height: '100%',
            width: '80%',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#2563EB',
            animation: 'pulse-soft 1.5s infinite ease-in-out'
          }}
        />
      </div>
    </div>
  );
}
