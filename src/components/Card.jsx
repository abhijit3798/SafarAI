import React from 'react';

/**
 * Reusable Card Container.
 * Supports standard cards, glassmorphic styling, and skeleton shimmer loading slots.
 */
export default function Card({
  children,
  onClick,
  glass = false,
  shimmer = false,
  style = {},
  className = '',
  ...props
}) {
  const cardClass = glass ? 'card glass-card' : 'card';

  if (shimmer) {
    return (
      <div 
        className={`${cardClass} ${className}`}
        style={{
          ...style,
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '16px'
        }}
        {...props}
      >
        {/* Mock Heading Line */}
        <div 
          style={{ 
            height: '18px', 
            width: '60%', 
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-color) 50%, var(--bg-tertiary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s infinite linear' 
          }} 
        />
        
        {/* Mock Description Lines */}
        <div 
          style={{ 
            height: '12px', 
            width: '90%', 
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-color) 50%, var(--bg-tertiary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s infinite linear' 
          }} 
        />

        <div 
          style={{ 
            height: '12px', 
            width: '40%', 
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-color) 50%, var(--bg-tertiary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s infinite linear' 
          }} 
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${cardClass} ${className}`}
      style={{
        ...style,
        cursor: onClick ? 'pointer' : 'default'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
