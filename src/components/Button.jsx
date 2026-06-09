import React from 'react';

/**
 * Reusable Button Component.
 * Supports primary gradient, secondary border, accent, link-text, and circular icon types.
 */
export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  style = {},
  className = '',
  ...props
}) {
  const getBtnClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn btn-primary';
      case 'secondary':
        return 'btn btn-secondary';
      case 'accent':
        return 'btn'; // custom styled in styles
      case 'text':
        return 'btn-text';
      case 'icon':
        return 'btn-icon';
      default:
        return 'btn btn-primary';
    }
  };

  const buttonStyle = {
    ...style,
    opacity: (disabled || loading) ? 0.6 : 1,
    pointerEvents: (disabled || loading) ? 'none' : 'auto'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${getBtnClass()} ${className}`}
      style={buttonStyle}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="animate-pulse-soft">Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
