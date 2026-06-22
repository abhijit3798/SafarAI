import React from 'react';
import { Plane, Train, Bus, Info, Landmark } from 'lucide-react';

export default function TransportSuggestions({ transport, source, destination }) {
  if (!transport || transport.length === 0) return null;

  const getTransportIcon = (type) => {
    switch (type) {
      case 'Flight':
        return <Plane size={18} />;
      case 'Train':
        return <Train size={18} />;
      case 'Bus/Cab':
      case 'Bus':
      case 'Cab':
        return <Bus size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  const getTransportColor = (type) => {
    switch (type) {
      case 'Flight':
        return 'var(--color-info)';
      case 'Train':
        return 'var(--color-primary)';
      case 'Bus/Cab':
      case 'Bus':
      case 'Cab':
        return 'var(--color-secondary)';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: '700' }}>
        Transport Routes
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Getting from <strong>{source}</strong> to <strong>{destination}</strong>:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {transport.map((option, index) => {
          const color = getTransportColor(option.type);
          return (
            <div 
              key={index} 
              className="card"
              style={{
                borderColor: 'var(--border-color)',
                borderLeft: `4px solid ${color}`
              }}
            >
              {/* Header with Icon and Type */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: color, fontWeight: '700', fontSize: '0.9rem' }}>
                  {getTransportIcon(option.type)}
                  <span>{option.type} Route</span>
                </div>
                
                {option.priceUnavailable ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                      Unknown
                    </span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                      Price Unavailable
                    </span>
                  </div>
                ) : option.cost > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-success)' }}>
                      ₹{option.cost.toLocaleString('en-IN')} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>/ ticket</span>
                    </span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                      Estimated Price
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Title & Duration */}
              <div style={{ marginBottom: '8px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '2px' }}>{option.name}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>Duration: <strong>{option.duration}</strong></span>
                </div>
              </div>

              {/* Recommendation Note */}
              {option.recommendation && (
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    background: 'var(--bg-tertiary)', 
                    padding: '10px 12px', 
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <Info size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-primary-light)' }} />
                  <span>{option.recommendation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
