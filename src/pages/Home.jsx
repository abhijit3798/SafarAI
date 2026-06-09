import React, { useState } from 'react';
import { Search, Compass, MapPin, Calendar, Users, ArrowRight, Sparkles, AlertCircle, Mountain, Flame, Sun, Heart, Smile } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';
import { trendingDestinations } from '../services/mockData';

export default function Home() {
  const { navigateTo } = useNavigation() || {};
  const [savedTrips] = useLocalStorage('safar_ai_saved_trips', []);
  const [searchVal, setSearchVal] = useState('');

  // Popular Categories config
  const categoriesList = [
    { id: 'beach', label: 'Beach', icon: Sun, defaultDest: 'Goa', vibe: 'Leisure' },
    { id: 'mountain', label: 'Mountain', icon: Mountain, defaultDest: 'Manali', vibe: 'Adventure' },
    { id: 'spiritual', label: 'Spiritual', icon: Flame, defaultDest: 'Varanasi', vibe: 'Spiritual' },
    { id: 'family', label: 'Family', icon: Users, defaultDest: 'Jaipur', vibe: 'Family' },
    { id: 'adventure', label: 'Adventure', icon: Compass, defaultDest: 'Leh Ladakh', vibe: 'Adventure' }
  ];

  const handleCategoryClick = (cat) => {
    navigateTo('planner', { 
      prefillDestination: cat.defaultDest,
      prefillVibe: cat.vibe,
      prefillCategory: cat.label
    });
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchVal.trim()) return;
    navigateTo('planner', { prefillDestination: searchVal.trim() });
  };

  const handleTrendingClick = (destName) => {
    navigateTo('planner', { prefillDestination: destName });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '40px' }}>
      
      {/* 1. Large Hero Image with Search Overlaid */}
      <div 
        style={{ 
          position: 'relative', 
          height: '340px', 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.75)), url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px 20px'
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span 
            className="badge badge-primary animate-pulse-soft"
            style={{ 
              fontSize: '0.7rem', 
              background: 'rgba(255, 255, 255, 0.2)', 
              color: '#white', 
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '8px'
            }}
          >
            🇮🇳 Incredible India
          </span>
          <h2 
            style={{ 
              fontSize: '1.9rem', 
              fontWeight: '800', 
              color: 'white', 
              textShadow: '0 2px 4px rgba(0,0,0,0.6)', 
              lineHeight: '1.25',
              letterSpacing: '-0.02em',
              margin: '0 0 6px 0'
            }}
          >
            Plan Smart. Travel Easy.
          </h2>
          <p style={{ color: '#f1f5f9', fontSize: '0.88rem', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            Discover historic sights and tailor your journeys.
          </p>
        </div>

        {/* Floating Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', width: '100%' }}>
          <div 
            className="input-container" 
            style={{ 
              flex: 1, 
              margin: 0, 
              background: 'rgba(255, 255, 255, 0.95)', 
              backdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Search size={16} className="input-icon" style={{ color: '#4B5563' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Where next? E.g. Goa, Leh..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              style={{ color: '#111827', minHeight: '44px' }}
            />
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            style={{ 
              padding: '0 16px', 
              height: '44px', 
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-indigo)'
            }}
          >
            <span>Search</span>
          </Button>
        </form>
      </div>

      {/* 2. Popular Categories Pills */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} style={{ color: 'var(--color-warning)' }} />
          <span>Explore by Category</span>
        </h3>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categoriesList.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)'
                }}
                className="stay-tab-btn"
              >
                <IconComponent size={14} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--text-primary)' }}>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Continue Planning Carousel */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Continue Planning
        </h3>
        {savedTrips && savedTrips.length > 0 ? (
          <div 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              overflowX: 'auto', 
              paddingBottom: '8px', 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              margin: '0 -16px',
              paddingLeft: '16px',
              paddingRight: '16px'
            }}
          >
            {savedTrips.map((trip) => (
              <div 
                key={trip.id}
                onClick={() => navigateTo('generated-trip', { tripData: trip })}
                style={{
                  flex: '0 0 260px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  backgroundImage: 'var(--grad-glow)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform var(--transition-fast)'
                }}
                className="card"
              >
                <span 
                  className="badge badge-secondary" 
                  style={{ 
                    fontSize: '0.6rem', 
                    padding: '2px 6px', 
                    marginBottom: '10px',
                    display: 'inline-block' 
                  }}
                >
                  {trip.vibe.split(',')[0]}
                </span>
                
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {trip.destination}
                </h4>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={10} />
                      <span>{trip.source}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                      <Calendar size={10} />
                      <span>{trip.duration} Days</span>
                    </span>
                  </div>
                  <div style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card style={{ padding: '20px', border: '1px dashed var(--border-color)', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '12px' }}>
              No active draft plans. Build your customized dream itinerary now!
            </p>
            <Button onClick={() => navigateTo('planner')} variant="secondary" style={{ fontSize: '0.8rem', padding: '6px 14px', margin: '0 auto', display: 'flex', gap: '6px', borderRadius: 'var(--radius-md)' }}>
              <span>Build A Trip</span>
              <Sparkles size={12} style={{ color: 'var(--color-warning)' }} />
            </Button>
          </Card>
        )}
      </div>

      {/* 4. Trending Destinations */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>Trending Destinations</h3>
        </div>
        <div className="trending-grid">
          {trendingDestinations.slice(0, 4).map((dest) => (
            <div
              key={dest.id}
              className="trending-card"
              onClick={() => handleTrendingClick(dest.name)}
              style={{ height: '150px', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="trending-img"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1477584305590-38772bfc3f3c?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="trending-overlay" style={{ padding: '12px' }}>
                <span className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: 'auto', fontSize: '0.55rem', padding: '2px 6px' }}>
                  {dest.vibe.split(',')[0]}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div>
                    <h4 className="trending-title" style={{ fontSize: '0.9rem', fontWeight: '800', margin: 0 }}>{dest.name}</h4>
                    <p className="trending-subtitle" style={{ fontSize: '0.65rem', margin: '2px 0 0 0', opacity: 0.9 }}>{dest.tagline}</p>
                  </div>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Start Planning CTA */}
      <Card 
        className="glass-card animate-slide-up"
        style={{ 
          padding: '24px', 
          textAlign: 'center', 
          border: '1px solid rgba(59, 91, 255, 0.15)',
          background: 'var(--bg-accent)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <Sparkles size={28} style={{ color: 'var(--color-warning)', margin: '0 auto 12px auto', display: 'block' }} />
        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '6px', color: 'var(--text-primary)' }}>
          Design Your Ideal Escape
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '20px', lineHeight: '1.4', maxWidth: '320px', margin: '0 auto 20px auto' }}>
          Select specific transits, preferred stays, exact budgets, style styles, and safety parameters.
        </p>
        <Button 
          onClick={() => navigateTo('planner')} 
          variant="primary" 
          style={{ width: '100%', maxWidth: '240px', margin: '0 auto', display: 'flex', gap: '8px', justifyContent: 'center', borderRadius: 'var(--radius-md)' }}
        >
          <span>Start Planning</span>
          <ArrowRight size={16} />
        </Button>
      </Card>

    </div>
  );
}
