import React, { useState, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { fetchTripPlan } from '../api/tripApi';
import TripPlannerForm from '../components/TripPlannerForm';
import Loader from '../components/Loader';
import { getCachedTrip, saveTripToCache } from '../utils/tripCache';
import { RefreshCw } from 'lucide-react';

export default function TripPlanner() {
  const { navigationState = {}, navigateTo } = useNavigation() || {};
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Planner mode: 'quick' (local templates) vs 'smart' (Gemini AI)
  const [plannerMode, setPlannerMode] = useState('quick');

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  // Monitor forceRegenerate navigation requests (e.g. from Generate Again button)
  useEffect(() => {
    if (navigationState?.forceRegenerate && !isRegenerating) {
      setIsRegenerating(true);
      const params = navigationState.forceRegenerate;
      
      setPlannerMode(params.mode || 'quick');

      executeGeneration({
        source: params.source,
        destination: params.destination,
        days: params.days,
        vibe: params.vibe,
        budgetLevel: params.budgetLevel,
        mode: params.mode || 'quick'
      });
    }
  }, [navigationState]);

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
        mode: plannerMode
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

      const cached = saveTripToCache(formData.source, formData.destination, formData.days, formData.interests?.join(', ') || formData.vibe || 'Leisure', completedTrip);

      // Save generated trip locally in localStorage
      localStorage.setItem('safar_ai_last_generated_trip', JSON.stringify({
        id: tripId,
        createdDate: new Date().toISOString(),
        inputs: formData,
        result: cached
      }));

      const currentCount = parseInt(localStorage.getItem('safar_ai_created_count') || '0');
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

  const handleSelectSmartMode = () => {
    const key = localStorage.getItem('safar_ai_gemini_key') || '';
    if (!key) {
      alert("Gemini API Key is required for Smart AI Planner mode. You can enter an optional API key in Settings or Profile. Defaulting to Quick Planner mode.");
      setPlannerMode('quick');
      navigateTo('settings');
    } else {
      setPlannerMode('smart');
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
    // Left as stub since timing is controlled programmatically in executeGeneration
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

      {/* PLANNING MODE SELECTOR */}
      <div className="card glass-card" style={{ padding: '16px', marginBottom: '20px', borderRadius: 'var(--radius-md)' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '700' }}>Planning Mode</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => setPlannerMode('quick')}
              className="stay-tab-btn"
              style={{
                padding: '10px',
                fontSize: '0.85rem',
                fontWeight: '700',
                borderColor: plannerMode === 'quick' ? 'var(--color-primary)' : 'var(--border-color)',
                background: plannerMode === 'quick' ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                color: plannerMode === 'quick' ? 'var(--color-primary)' : 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              ⚡ Quick Planner
            </button>
            
            <button
              type="button"
              onClick={handleSelectSmartMode}
              className="stay-tab-btn"
              style={{
                padding: '10px',
                fontSize: '0.85rem',
                fontWeight: '700',
                borderColor: plannerMode === 'smart' ? 'var(--color-warning)' : 'var(--border-color)',
                background: plannerMode === 'smart' ? 'rgba(255, 184, 77, 0.08)' : 'var(--bg-secondary)',
                color: plannerMode === 'smart' ? 'var(--color-warning)' : 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              ✨ Smart AI
            </button>
          </div>
        </div>
        
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '6px', 
            color: 'var(--text-tertiary)', 
            fontSize: '0.75rem', 
            marginTop: '12px',
            fontWeight: '600'
          }}
        >
          <span>
            {plannerMode === 'smart' 
              ? '✨ Powered by Gemini AI Engine' 
              : '⚡ Powered by Smart Templates'
            }
          </span>
        </div>
      </div>

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
