import React from 'react';

/**
 * Reusable Form Input Component.
 * Supports labels, validation error banners, and prefix icons.
 */
export default function Input({
  label,
  icon: IconComponent,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div className={`form-group ${className}`} style={style}>
      {label && <label className="form-label">{label}</label>}
      
      <div className="input-container">
        {IconComponent && (
          <span className="input-icon">
            <IconComponent size={18} />
          </span>
        )}
        
        <input
          type={type}
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            paddingLeft: IconComponent ? '42px' : '14px',
            borderColor: error ? 'var(--color-accent)' : 'var(--border-color)'
          }}
          {...props}
        />
      </div>

      {error && (
        <span 
          style={{ 
            display: 'block', 
            fontSize: '0.75rem', 
            color: 'var(--color-accent)', 
            marginTop: '4px',
            fontWeight: '600'
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
