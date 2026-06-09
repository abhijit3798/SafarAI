import React, { useState } from 'react';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Calendar, MapPin, Share2, 
  RefreshCw, Award, Compass, Lightbulb, Download, Sparkles, Plane, Home, DollarSign, ChevronDown, ChevronUp, Check, Pencil
} from 'lucide-react';
import DayWiseItinerary from './DayWiseItinerary';
import StaySuggestions from './StaySuggestions';
import TransportSuggestions from './TransportSuggestions';
import BudgetEstimator from './BudgetEstimator';
import Card from './Card';
import { calculateTripScore, extractPlacesToVisit, compileTripTips } from '../utils/tripAnalytics.js';

export default function TripDetailView({ 
  tripData, 
  isSaved, 
  onSave, 
  onBack,
  isFromCache = false,
  cachedAt = null,
  onGenerateAgain = null,
  onEditTrip = null
}) {
  if (!tripData) return null;

  // Manage active expanded accordion section
  const [expandedSection, setExpandedSection] = useState('summary'); // 'summary' | 'transport' | 'stay' | 'itinerary' | 'budget' | 'tips' | 'save'

  const toggleAccordion = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Safe fallback for search parameters
  const searchParams = tripData.searchParams || {
    source: tripData.source || 'Delhi',
    destination: tripData.destination,
    days: tripData.duration || 4,
    month: 'June',
    groupSize: 1,
    travelPref: 'Any',
    optimization: 'Balanced',
    budgetLevel: tripData.budgetLevel || 'Moderate',
    stayType: 'Hotel',
    tripType: 'Solo',
    interests: [],
    tripStyle: 'Balanced',
    avoid: [],
    totalBudget: 25000,
    budgetSplit: { travel: 30, stay: 35, food: 20, activities: 15 },
    advanced: {}
  };

  // Compute analytics dynamically
  const tripScore = calculateTripScore(tripData);
  const placesToVisit = extractPlacesToVisit(tripData);
  const tripTips = compileTripTips(tripData);

  // Fallback for budget breakdown estimates
  const breakdown = tripData.budgetBreakdown || {
    Travel: Math.round((searchParams.totalBudget * (searchParams.budgetSplit?.travel || 30)) / 100),
    Stay: Math.round((searchParams.totalBudget * (searchParams.budgetSplit?.stay || 35)) / 100),
    Food: Math.round((searchParams.totalBudget * (searchParams.budgetSplit?.food || 20)) / 100),
    Activities: Math.round((searchParams.totalBudget * (searchParams.budgetSplit?.activities || 15)) / 100)
  };

  const handleShare = () => {
    const text = `SafarAI Trip to ${tripData.destination} (${tripData.duration} days from ${tripData.source})!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Trip link copied to clipboard! (Share it with your travel buddies)");
    } else {
      alert(text);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* Back & Actions Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-text" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: 0, cursor: 'pointer' }}>
          <ArrowLeft size={16} />
          <span>Back to Planner</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-icon" 
            onClick={onSave}
            title={isSaved ? "Saved" : "Save Trip"}
            style={{ 
              borderColor: isSaved ? 'var(--color-primary)' : 'var(--border-color)',
              color: isSaved ? 'var(--color-primary)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {isSaved ? <BookmarkCheck size={18} fill="currentColor" /> : <Bookmark size={18} />}
          </button>
          
          <button 
            className="btn-icon" 
            onClick={handleShare}
            title="Share Trip"
            style={{ cursor: 'pointer' }}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '4px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '900', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0 }}>
          Your Trip is Ready
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
          Explore your optimized travel itinerary details below.
        </p>
      </div>

      {/* Caching Info Alert Bar */}
      {isFromCache && (
        <div 
          className="card glass-card"
          style={{ 
            background: 'var(--bg-accent)', 
            borderColor: 'var(--color-primary-light)', 
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundImage: 'var(--grad-glow)',
            marginBottom: '4px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                ⚡ Using saved plan (Generated recently)
              </span>
              {cachedAt && (
                <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                  Last Updated: {new Date(cachedAt).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            {onGenerateAgain && (
              <button 
                onClick={onGenerateAgain}
                className="stay-feature-tag"
                style={{ 
                  padding: '4px 10px', 
                  fontSize: '0.7rem', 
                  gap: '4px',
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  fontWeight: '700',
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={10} />
                <span>Regenerate</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Header Card */}
      <div 
        className="card animate-slide-up" 
        style={{ 
          background: 'var(--grad-dark)', 
          color: 'white',
          padding: '20px',
          boxShadow: 'var(--shadow-md)',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.85)), url(https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="badge" style={{ background: 'var(--color-primary)', color: 'white', fontSize: '0.65rem' }}>
            {searchParams.month} Itinerary
          </span>

          <span className="badge badge-secondary" style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Award size={10} />
            <span>Score: {tripScore.score}/100</span>
          </span>
        </div>
        
        <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'white', marginTop: '12px', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
          {tripData.destination}
        </h2>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#f1f5f9', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} />
            <span>From {tripData.source}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} />
            <span>{tripData.duration} Days</span>
          </span>
        </div>
      </div>

      {/* ----------------------------------------------------
          CARD STACK (6 Expanded Cards)
          ---------------------------------------------------- */}

      {/* 1. OVERVIEW CARD */}
      <Card style={{ padding: '20px', borderRadius: 'var(--radius-lg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Compass size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Overview</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', fontSize: '0.8rem' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.72rem' }}>Destination</span>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{tripData.destination}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.72rem' }}>Starting City</span>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{tripData.source}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.72rem' }}>Duration / Dates</span>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{tripData.duration} Days ({searchParams.month})</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.72rem' }}>Travel Companions</span>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{searchParams.tripType} ({searchParams.groupSize} {searchParams.groupSize === 1 ? 'Person' : 'People'})</strong>
          </div>
        </div>
        
        {placesToVisit.length > 0 && (
          <div style={{ marginTop: '16px', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.72rem', marginBottom: '8px' }}>Key Places of Interest</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {placesToVisit.map((p, idx) => (
                <span key={idx} className="stay-feature-tag" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* 2. TRANSPORT CARD */}
      <Card style={{ padding: '20px', borderRadius: 'var(--radius-lg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Plane size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Transport Options</h3>
        </div>
        <TransportSuggestions 
          transport={tripData.transport} 
          source={tripData.source}
          destination={tripData.destination}
        />
      </Card>

      {/* 3. STAY CARD */}
      <Card style={{ padding: '20px', borderRadius: 'var(--radius-lg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Home size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Stay Suggestions</h3>
        </div>
        <StaySuggestions stays={tripData.stays} duration={tripData.duration} />
      </Card>

      {/* 4. DAY PLAN CARD */}
      <Card style={{ padding: '20px', borderRadius: 'var(--radius-lg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Calendar size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Day Wise Itinerary</h3>
        </div>
        <DayWiseItinerary itinerary={tripData.itinerary} />
      </Card>

      {/* 5. BUDGET CARD */}
      <Card style={{ padding: '20px', borderRadius: 'var(--radius-lg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <DollarSign size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Budget & Splits</h3>
        </div>
        
        {/* Split breakdown visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Interactive Custom Splits</h4>
          
          {Object.entries(breakdown).map(([key, val]) => {
            const percentage = searchParams.budgetSplit ? (searchParams.budgetSplit[key.toLowerCase()] || 25) : 25;
            return (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>{key === 'Travel' ? '✈️' : key === 'Stay' ? '🏨' : key === 'Food' ? '🍔' : '🎟️'} {key} ({percentage}%)</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹{val.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      background: key === 'Travel' ? 'var(--color-primary)' : key === 'Stay' ? 'var(--color-secondary)' : 'var(--color-warning)',
                      width: `${percentage}%` 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <BudgetEstimator 
          estimates={tripData.budgetEstimates} 
          breakdown={breakdown}
          duration={tripData.duration}
          initialTier={searchParams.budgetLevel}
        />
      </Card>

      {/* 6. TIPS CARD */}
      <Card style={{ padding: '20px', borderRadius: 'var(--radius-lg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Lightbulb size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>Smart Tips & Style</h3>
        </div>
        
        {/* Style detail */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span className="stay-feature-tag" style={{ fontSize: '0.75rem', background: 'var(--bg-accent)', color: 'var(--color-primary)' }}>
            🏃 Pace: {searchParams.tripStyle}
          </span>
          {searchParams.avoid?.map(av => (
            <span key={av} className="stay-feature-tag" style={{ fontSize: '0.75rem', background: 'rgba(244, 63, 94, 0.05)', color: 'var(--color-accent)' }}>
              🚷 Avoid {av}
            </span>
          ))}
          {Object.entries(searchParams.advanced || {}).map(([key, val]) => {
            if (!val) return null;
            const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
            return (
              <span key={key} className="stay-feature-tag" style={{ fontSize: '0.75rem', background: 'rgba(13, 148, 136, 0.05)', color: 'var(--color-secondary)' }}>
                ✓ {formattedKey}
              </span>
            );
          })}
        </div>

        {/* Custom tips */}
        {tripTips.length > 0 && (
          <div style={{ background: 'rgba(234, 179, 8, 0.02)', border: '1px solid rgba(234, 179, 8, 0.15)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '750', marginBottom: '8px', color: 'var(--text-primary)' }}>Personalized Guidelines</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: '1.4' }}>
              {tripTips.map((tip, idx) => (
                <li key={idx} style={{ listStyleType: 'disc' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Bottom Main Wizard Actions */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          marginTop: '24px',
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '20px'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <button 
            onClick={onSave}
            className="btn tap-scale"
            style={{ 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: '700',
              height: '44px',
              background: isSaved ? 'var(--bg-accent)' : 'var(--grad-primary)',
              borderColor: isSaved ? 'var(--color-primary)' : 'transparent',
              color: isSaved ? 'var(--color-primary)' : 'white',
              cursor: 'pointer'
            }}
          >
            {isSaved ? <BookmarkCheck size={16} fill="currentColor" /> : <Bookmark size={16} />}
            <span>{isSaved ? 'Saved' : 'Save Trip'}</span>
          </button>

          {onGenerateAgain && (
            <button 
              onClick={onGenerateAgain}
              className="btn btn-secondary tap-scale"
              style={{ 
                borderRadius: 'var(--radius-md)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: '700',
                height: '44px',
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={16} />
              <span>Generate Again</span>
            </button>
          )}

          {onEditTrip && (
            <button 
              onClick={onEditTrip}
              className="btn btn-secondary tap-scale"
              style={{ 
                borderRadius: 'var(--radius-md)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: '700',
                height: '44px',
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <Pencil size={16} />
              <span>Edit Trip</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
