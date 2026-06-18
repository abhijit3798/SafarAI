import React, { useState, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { fetchTripPlan } from '../api/tripApi';
import TripPlannerForm from '../components/TripPlannerForm';
import Loader from '../components/Loader';
import { saveTripToCache } from '../utils/tripCache';
import { RefreshCw } from 'lucide-react';

export default function TripPlanner() {
  const { navigationState = {}, navigateTo } = useNavigation() || {};
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  // Monitor forceRegenerate navigation requests (e.g. from Generate Again button)
  useEffect(() => {
    if (navigationState?.forceRegenerate && !isRegenerating) {
      setIsRegenerating(true);
      const params = navigationState.forceRegenerate;
      
      executeGeneration({
        source: params.source,
        destination: params.destination,
        days: params.days,
        vibe: params.vibe,
        budgetLevel: params.budgetLevel,
        mode: 'quick'
      });
    }
  }, [navigationState, isRegenerating]);

  const executeGeneration = async (formData) => {
    console.log("generation started");
    setLastSubmittedData(formData);
    setLoading(true);
    setErrorMsg('');
    setIsRegenerating(false);
    
    const startTime = Date.now();

    try {
      const plan = await fetchTripPlan({
        ...formData,
        vibe: formData.interests?.join(', ') || formData.vibe || 'Leisure',
        mode: 'quick'
      });

      console.log("generation completed");

      const tripId = plan.id || `trip-${Date.now()}`;
      const completedTrip = {
        ...plan,
        id: tripId,
        vibe: formData.interests?.join(', ') || formData.vibe || 'Leisure',
        budgetLevel: formData.budgetLevel || 'Moderate',
        searchParams: formData
      };

      const cached = saveTripToCache(
        formData.source,
        formData.destination,
        formData.days,
        formData.interests?.join(', ') || formData.vibe || 'Leisure',
        completedTrip
      );

      // Save generated trip locally in localStorage
      localStorage.setItem('safar_ai_last_generated_trip', JSON.stringify({
        id: tripId,
        createdDate: new Date().toISOString(),
        inputs: formData,
        result: cached
      }));

      const currentCount = parseInt(localStorage.getItem('safar_ai_created_count') || '0', 10);
      localStorage.setItem('safar_ai_created_count', (currentCount + 1).toString());

      // Ensure loader runs for exactly 3 seconds for visual satisfaction before navigating
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 3000 - elapsedTime);

      setTimeout(() => {
        console.log("navigation triggered");
        navigateTo('trip-result', { 
          tripData: cached,
          isFromCache: false
        });
        setLoading(false);
      }, remainingTime);

    } catch (err) {
      console.error("Generation failed:", err);
      setErrorMsg(err.message || "An unexpected error occurred while generating your itinerary.");
      setLoading(false);
    }
  };

  // Read optional prefilled destination and vibe passed as navigate state payload
  const prefillDest = navigationState?.prefillDestination || '';
  const prefillVibe = navigationState?.prefillVibe || '';
  const prefillSearchParams = navigationState?.prefillSearchParams || null;

  const handlePlanSubmit = async (formData) => {
    // Always run the full generation flow and loading animation
    executeGeneration(formData);
  };

  const handleLoaderComplete = () => {
    // Controlled programmatically in executeGeneration
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '32px' }}>
      {/* Loading Overlay */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '4px' }}>
          Build Trip
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Formulate a custom plan optimized for destinations inside India.
        </p>
      </div>

      {errorMsg && (
        <div 
          className="card" 
          style={{ 
            background: 'rgba(255, 82, 82, 0.05)', 
            borderColor: 'rgba(255, 82, 82, 0.2)', 
            color: 'var(--text-primary)',
            padding: '20px',
            marginBottom: '20px',
            fontSize: '0.82rem',
            lineHeight: '1.45',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}
        >
          <h4 style={{ color: 'var(--color-accent)', fontWeight: '800', marginBottom: '6px', fontSize: '1.05rem' }}>
            Generation Failed
          </h4>
          <p style={{ marginBottom: '14px', color: 'var(--text-secondary)' }}>{errorMsg}</p>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {lastSubmittedData && (
              <button
                onClick={() => executeGeneration(lastSubmittedData)}
                className="btn btn-primary tap-scale"
                style={{
                  background: 'var(--grad-primary)',
                  color: 'white',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '700',
                  fontSize: '0.75rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={12} />
                <span>Retry Generation</span>
              </button>
            )}
            
            <button
              onClick={() => {
                setErrorMsg('');
              }}
              className="btn btn-secondary tap-scale"
              style={{
                borderColor: 'var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 16px',
                fontWeight: '700',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main planner form wizard */}
      <TripPlannerForm 
        initialDestination={prefillDest} 
        initialVibe={prefillVibe}
        initialSearchParams={prefillSearchParams}
        onSubmit={handlePlanSubmit}
        loading={loading}
      />
    </div>
  );
}
