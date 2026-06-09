import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import useLocalStorage from '../hooks/useLocalStorage';
import TripDetailView from '../components/TripDetailView';
import Button from '../components/Button';
import { Compass } from 'lucide-react';

export default function GeneratedTrip() {
  const { navigationState: rawState, navigateTo } = useNavigation() || {};
  const navigationState = rawState || {};
  const [savedTrips, setSavedTrips] = useLocalStorage('safar_ai_saved_trips', []);

  // Retrieve trip plan payload from navigation state with fallback to last generated trip in localStorage
  const lastGeneratedRaw = localStorage.getItem('safar_ai_last_generated_trip');
  const lastGenerated = lastGeneratedRaw ? JSON.parse(lastGeneratedRaw) : null;
  const tripData = navigationState?.tripData || lastGenerated?.result;

  if (!tripData) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          textAlign: 'center',
          animation: 'fadeIn var(--transition-normal)'
        }}
      >
        <Compass size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '16px', opacity: 0.5 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>No Active Plan Found</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px', maxWidth: '320px' }}>
          Select a trending city on the Home page or configure parameters in the planner to map your travel route.
        </p>
        <Button onClick={() => navigateTo('planner')} variant="primary">
          Open AI Planner
        </Button>
      </div>
    );
  }

  const isSaved = savedTrips.some(t => t.id === tripData.id);

  const handleSaveToggle = () => {
    if (isSaved) {
      setSavedTrips(prev => prev.filter(t => t.id !== tripData.id));
    } else {
      setSavedTrips(prev => [tripData, ...prev]);
    }
  };

  const isFromCache = navigationState?.isFromCache || !!tripData?.cachedAt;
  const cachedAt = navigationState?.cachedAt || tripData?.cachedAt;

  const handleGenerateAgain = () => {
    const searchParams = tripData.searchParams || {
      source: tripData.source,
      destination: tripData.destination,
      days: tripData.duration || tripData.itinerary?.length || 4,
      vibe: tripData.vibe,
      budgetLevel: tripData.budgetLevel || 'Moderate',
      mode: tripData.mode || 'quick'
    };

    navigateTo('planner', {
      forceRegenerate: {
        source: searchParams.source,
        destination: searchParams.destination,
        days: searchParams.days,
        vibe: searchParams.tripTypeOrVibe || searchParams.vibe || 'Leisure',
        budgetLevel: searchParams.budgetLevel,
        mode: searchParams.mode || 'quick'
      }
    });
  };

  const handleEditTrip = () => {
    const searchParams = tripData.searchParams || {
      source: tripData.source,
      destination: tripData.destination,
      days: tripData.duration || tripData.itinerary?.length || 4,
      vibe: tripData.vibe,
      budgetLevel: tripData.budgetLevel || 'Moderate',
      mode: tripData.mode || 'quick'
    };

    navigateTo('planner', {
      prefillSearchParams: searchParams
    });
  };

  return (
    <div className="animate-fade-in">
      <TripDetailView
        tripData={tripData}
        isSaved={isSaved}
        onSave={handleSaveToggle}
        onBack={() => navigateTo('planner')}
        isFromCache={isFromCache}
        cachedAt={cachedAt}
        onGenerateAgain={handleGenerateAgain}
        onEditTrip={handleEditTrip}
      />
    </div>
  );
}
