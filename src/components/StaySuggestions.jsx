import React from 'react';
import { Star, MapPin, Award, ShieldAlert, BadgeCheck } from 'lucide-react';

export default function StaySuggestions({ stays, duration }) {
  if (!stays || stays.length === 0) return null;

  const getTierIcon = (type) => {
    switch (type) {
      case 'Budget':
        return <Award size={16} style={{ color: 'var(--color-success)' }} />;
      case 'Moderate':
        return <BadgeCheck size={16} style={{ color: 'var(--color-primary)' }} />;
      case 'Luxury':
        return <Award size={16} style={{ color: 'var(--color-warning)' }} className="animate-pulse-soft" />;
      default:
        return <BadgeCheck size={16} />;
    }
  };

  const getTierClass = (type) => {
    switch (type) {
      case 'Budget': return 'badge-success';
      case 'Moderate': return 'badge-primary';
      case 'Luxury': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '700' }}>
        Where to Stay
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
        Selected accommodation recommendations based on your destination:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {stays.map((stay, index) => {
          const totalCost = stay.pricePerNight * duration;
          return (
            <div 
              key={index} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderLeft: `4px solid ${
                  stay.type === 'Budget' ? 'var(--color-success)' : 
                  stay.type === 'Moderate' ? 'var(--color-primary)' : 
                  'var(--color-warning)'
                }`
              }}
            >
              {/* Top Header Badge & Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${getTierClass(stay.type)}`}>
                  {getTierIcon(stay.type)}
                  <span style={{ marginLeft: '4px' }}>{stay.type} Option</span>
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-warning)' }}>
                  <Star size={16} fill="currentColor" />
                  <span>{stay.rating}</span>
                </div>
              </div>

              {/* Hotel Name & Location */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>{stay.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={12} />
                  <span>{stay.location}</span>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="stay-features">
                {stay.features.map((feat, fIdx) => (
                  <span key={fIdx} className="stay-feature-tag">
                    {feat}
                  </span>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Per Night Rate (Est.)</span>
                  <span className="stay-price">
                    {stay.priceUnavailable ? 'Estimated' : `₹${stay.pricePerNight.toLocaleString('en-IN')}`}
                  </span>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Total stay ({duration} nights) (Est.)</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {stay.priceUnavailable ? 'Estimated' : `₹${totalCost.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
