import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Search, Compass, Trash2, Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function TripHistory() {
  const { navigateTo } = useNavigation();
  const [savedTrips, setSavedTrips] = useLocalStorage('safar_ai_saved_trips', []);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTrip = (trip) => {
    navigateTo('generated-trip', { tripData: trip });
  };

  const handleDeleteTrip = (tripId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this trip from your archive?")) {
      setSavedTrips(prev => prev.filter(t => t.id !== tripId));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire saved trip history? This action is permanent.")) {
      setSavedTrips([]);
    }
  };

  const filteredTrips = savedTrips.filter(trip => 
    trip.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (trip.vibe && trip.vibe.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '4px' }}>
          Saved Trips
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Access your planned itineraries offline anytime, anywhere.
        </p>
      </div>

      {savedTrips.length > 0 && (
        <div 
          className="glass-card" 
          style={{ 
            borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--border-color)', 
            padding: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div className="input-container" style={{ margin: 0 }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Search destination, starting city, or vibe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minHeight: '40px', paddingLeft: '36px', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      )}

      {/* Trip List */}
      {filteredTrips.length === 0 ? (
        <Card 
          glass 
          style={{ 
            textAlign: 'center', 
            padding: '48px 24px', 
            border: '1px dashed var(--border-color)', 
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div 
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'var(--bg-accent)', 
              color: 'var(--color-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            <Compass size={32} className="animate-pulse-soft" />
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
            {savedTrips.length === 0 ? 'No Saved Itineraries' : 'No Results Found'}
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '280px', lineHeight: '1.4' }}>
            {savedTrips.length === 0 
              ? 'Plan and save your first custom adventure to access it offline in this tab.' 
              : 'Double check your spelling or search queries to locate saved plans.'
            }
          </p>
          {savedTrips.length === 0 && (
            <Button onClick={() => navigateTo('planner')} variant="primary" style={{ padding: '10px 24px', borderRadius: 'var(--radius-md)' }}>
              <span>Build A Trip</span>
            </Button>
          )}
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredTrips.map((trip) => (
            <Card
              key={trip.id}
              onClick={() => handleSelectTrip(trip)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px',
                backgroundImage: 'var(--grad-glow)',
                borderLeft: '4px solid var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform var(--transition-fast)'
              }}
              className="card"
            >
              <div style={{ flex: 1, marginRight: '16px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.6rem', padding: '2px 6px', marginBottom: '8px', display: 'inline-block' }}>
                  {trip.vibe.split(',')[0]}
                </span>
                
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {trip.destination}
                </h4>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} />
                    <span>From {trip.source}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    <span>{trip.duration} Days</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={(e) => handleDeleteTrip(trip.id, e)}
                  style={{ 
                    color: 'var(--color-accent)', 
                    background: 'var(--bg-tertiary)', 
                    border: 'none', 
                    width: '34px',
                    height: '34px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="stay-tab-btn"
                  title="Delete itinerary"
                >
                  <Trash2 size={14} />
                </button>
                <ArrowRight size={16} style={{ color: 'var(--text-tertiary)' }} />
              </div>
            </Card>
          ))}

          <Button 
            onClick={handleClearAll} 
            variant="text" 
            style={{ 
              color: 'var(--color-accent)', 
              alignSelf: 'center', 
              padding: '12px', 
              fontSize: '0.85rem', 
              fontWeight: '750',
              marginTop: '10px'
            }}
          >
            Clear Archive History
          </Button>
        </div>
      )}

    </div>
  );
}
