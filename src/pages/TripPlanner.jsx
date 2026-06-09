import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';

function TripPlanner() {
  const { navigateTo } = useNavigation() || {};
  const [loading, setLoading] = useState(false);

  const handleGenerateDemo = () => {
    console.log("generation started");
    setLoading(true);
    
    // Simulate generation loading (2 seconds)
    setTimeout(() => {
      console.log("generation completed");
      
      const demoTrip = {
        id: `trip-demo-${Date.now()}`,
        destination: "Goa",
        source: "Delhi",
        duration: 4,
        vibe: "Leisure",
        summary: "4 Days in Goa from Delhi",
        budgetEstimates: { Budget: 15000, Moderate: 25000, Luxury: 50000 },
        budgetBreakdown: { Travel: 7500, Stay: 8750, Food: 5000, Activities: 3750 },
        stays: [
          { name: "Silver Sands Beach Resort", type: "Resort", price: "₹3,500/night", rating: 4.2, description: "Beachfront Resort.", isEstimated: true }
        ],
        stay: [
          { name: "Silver Sands Beach Resort", type: "Resort", price: "₹3,500/night", rating: 4.2, description: "Beachfront Resort.", isEstimated: true }
        ],
        transport: [
          { type: "Flight", name: "IndiGo Flight", duration: "2h 30m", cost: 5500, recommendation: "Fastest travel route.", isEstimated: true }
        ],
        itinerary: [
          {
            day: 1,
            title: "Arrive in Goa",
            activities: [
              { time: "Morning", title: "Arrive & Check-in", description: "Arrive at resort.", tip: "Pre-arrange airport cab." },
              { time: "Evening", title: "Sunset Walk", description: "Relax by the beach.", tip: "Try local cuisine." }
            ]
          }
        ],
        budget: { Travel: 7500, Stay: 8750, Food: 5000, Activities: 3750 },
        tips: ["Pre-book entry tickets.", "Carry light cotton clothing."],
        score: 85,
        searchParams: {
          source: "Delhi",
          destination: "Goa",
          days: 4,
          month: "June",
          groupSize: 1,
          travelPref: "Any",
          optimization: "Balanced",
          budgetLevel: "Moderate",
          stayType: "Hotel",
          tripType: "Solo",
          interests: [],
          tripStyle: "Balanced",
          avoid: [],
          totalBudget: 25000,
          budgetSplit: { travel: 30, stay: 35, food: 20, activities: 15 }
        }
      };

      localStorage.setItem('safar_ai_last_generated_trip', JSON.stringify({
        id: demoTrip.id,
        createdDate: new Date().toISOString(),
        inputs: demoTrip.searchParams,
        result: demoTrip
      }));

      console.log("navigation triggered");
      navigateTo('trip-result', { 
        tripData: demoTrip,
        isFromCache: false
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '8px' }}>
        Trip Planner
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
        Planner Loaded Successfully
      </p>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div className="loader-outer-ring" style={{ width: '32px', height: '32px', borderTopColor: 'var(--color-primary)' }}></div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Generating Demo Trip...</span>
        </div>
      ) : (
        <button
          onClick={handleGenerateDemo}
          className="btn btn-primary tap-scale"
          style={{
            background: 'var(--grad-primary)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '12px 24px',
            fontSize: '0.9rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Generate Demo Trip
        </button>
      )}
    </div>
  );
}

export default TripPlanner;
