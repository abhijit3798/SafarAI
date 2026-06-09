import React, { useState } from 'react';
import { PiggyBank, HelpCircle, AlertCircle, IndianRupee } from 'lucide-react';

export default function BudgetEstimator({ estimates, breakdown, duration, initialTier = 'Moderate' }) {
  const [selectedTier, setSelectedTier] = useState(initialTier);

  if (!estimates || !breakdown) return null;

  const activeAmount = estimates[selectedTier] || estimates['Moderate'] || 20000;

  // Calculate actual INR value for each category
  const calculateCategoryAmount = (percentage) => {
    return Math.round((activeAmount * percentage) / 100);
  };

  const categories = [
    { key: 'stays', label: 'Accommodation', colorClass: 'bar-stays', percentage: breakdown.stays || 40 },
    { key: 'transport', label: 'Transit & Local Cabs', colorClass: 'bar-transport', percentage: breakdown.transport || 25 },
    { key: 'food', label: 'Food & Dining', colorClass: 'bar-food', percentage: breakdown.food || 20 },
    { key: 'activities', label: 'Sightseeing & Entry Tickets', colorClass: 'bar-activities', percentage: breakdown.activities || 10 },
    { key: 'misc', label: 'Miscellaneous', colorClass: 'bar-misc', percentage: breakdown.misc || 5 },
  ];

  const getSavingsTip = (tier) => {
    switch (tier) {
      case 'Budget':
        return "You're already planning a super smart trip! Buy water bottles in local stores instead of tourist cafes, use regional trains (Sleeper/2S) or state transport buses, and eat at local dhabas where meals cost less than ₹150.";
      case 'Moderate':
        return "Save ~₹3,000 by renting a two-wheeler (scooter) instead of hiring private cabs, explore free walking tours, and alternate between upscale cafes and popular local street stalls.";
      case 'Luxury':
        return "Maximize your value by checking if your heritage hotels offer complimentary airport transfers or guided local history walks. Book luxury train compartments early for high comfort at slightly lower rates than last-minute flights.";
      default:
        return "Plan your days in geographical clusters to save fuel and travel time.";
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Primary Budget Card */}
      <div className="budget-hero">
        <span className="budget-hero-title">Selected Budget Estimate ({selectedTier})</span>
        <h2 className="budget-hero-amount">
          ₹{activeAmount.toLocaleString('en-IN')}
        </h2>
        <p style={{ fontSize: '0.75rem', opacity: 0.85 }}>
          Estimated cost for 1 person for {duration} days
        </p>
      </div>

      {/* Tier Selector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
        {Object.keys(estimates).map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className="stay-tab-btn"
            style={{
              padding: '8px 4px',
              fontSize: '0.8rem',
              borderColor: selectedTier === tier ? 'var(--color-primary)' : 'var(--border-color)',
              background: selectedTier === tier ? 'var(--bg-accent)' : 'var(--bg-secondary)',
              color: selectedTier === tier ? 'var(--color-primary)' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <span style={{ display: 'block', fontWeight: '700' }}>{tier}</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>
              Est. ₹{(estimates[tier] / 1000).toFixed(0)}k
            </span>
          </button>
        ))}
      </div>

      {/* Breakdown List */}
      <div className="card glass-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px' }}>Expense Breakdown</h3>
        <div className="budget-breakdown-list">
          {categories.map((cat) => {
            const catCost = calculateCategoryAmount(cat.percentage);
            return (
              <div key={cat.key} className="budget-item">
                <div className="budget-item-header">
                  <span style={{ color: 'var(--text-primary)' }}>{cat.label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    ₹{catCost.toLocaleString('en-IN')} ({cat.percentage}%)
                  </span>
                </div>
                
                <div className="budget-progress-track">
                  <div 
                    className={`budget-progress-bar ${cat.colorClass}`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saving Tip Alert */}
      <div 
        className="card" 
        style={{ 
          border: '1px solid var(--border-color)', 
          background: 'rgba(5, 150, 105, 0.05)', 
          borderColor: 'rgba(5, 150, 105, 0.2)',
          display: 'flex',
          gap: '12px',
          padding: '16px'
        }}
      >
        <PiggyBank size={20} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-success)', marginBottom: '4px' }}>
            SafarAI Money Saver Tip
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {getSavingsTip(selectedTier)}
          </p>
        </div>
      </div>
    </div>
  );
}
