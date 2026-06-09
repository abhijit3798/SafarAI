import { mockTripsData } from './mockData.js';
import { getTransportOptions } from './transportService/index.js';
import { getStays } from './hotelService/index.js';
import { calculateBudget } from './budgetService/index.js';
import { getItinerary } from './itineraryService/index.js';

// Helper to capitalize strings
const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

/**
 * Dynamically builds a travel itinerary locally by delegating to modular domain services.
 * Matches predefined mock data if available, otherwise generates a dynamic custom plan.
 * 
 * @param {Object} params
 * @param {string} params.source
 * @param {string} params.destination
 * @param {number|string} params.days
 * @param {string} params.vibe
 * @param {string} params.budgetLevel
 * @returns {Promise<Object>} The compiled travel plan
 */
export const generateLocalTripPlan = async (params) => {
  const {
    source,
    destination,
    days,
    month = 'June',
    groupSize = 1,
    travelPref = 'Any',
    optimization = 'Balanced',
    budgetLevel = 'Moderate',
    stayType = 'Hotel',
    tripType = 'Solo',
    interests = ['Nature'],
    tripStyle = 'Balanced',
    avoid = [],
    totalBudget = 20000,
    budgetSplit = { travel: 30, stay: 35, food: 20, activities: 15 },
    advanced = {}
  } = params;

  const normDest = destination.toLowerCase().trim();
  const capDest = capitalize(destination);
  const capSource = capitalize(source);

  const duration = Math.min(10, Math.max(1, parseInt(days) || 4));

  // 1. MATCH PREDEFINED MOCK DATA FIRST
  const matchedKey = Object.keys(mockTripsData).find(key => 
    normDest.includes(key) || key.includes(normDest)
  );

  if (matchedKey) {
    const baseMock = JSON.parse(JSON.stringify(mockTripsData[matchedKey]));
    baseMock.source = capSource;
    baseMock.destination = capDest;
    baseMock.duration = Math.min(duration, baseMock.itinerary.length);
    baseMock.itinerary = baseMock.itinerary.slice(0, baseMock.duration);
    
    // Scale budget estimates matching the duration ratio
    const ratio = baseMock.duration / mockTripsData[matchedKey].duration;
    baseMock.budgetEstimates = {
      Budget: Math.round(baseMock.budgetEstimates.Budget * ratio),
      Moderate: Math.round(baseMock.budgetEstimates.Moderate * ratio),
      Luxury: Math.round(baseMock.budgetEstimates.Luxury * ratio)
    };

    // Override with user's specific stay and travel choices
    baseMock.stays = await getStays({ destination: capDest, budgetLevel, duration: baseMock.duration, stayType });
    baseMock.transport = await getTransportOptions({ source: capSource, destination: capDest, budgetLevel, travelPref, optimization });

    baseMock.searchParams = {
      source: capSource,
      destination: capDest,
      days: baseMock.duration,
      month,
      groupSize,
      travelPref,
      optimization,
      budgetLevel,
      stayType,
      tripType,
      interests,
      tripStyle,
      avoid,
      totalBudget,
      budgetSplit,
      advanced
    };

    // Add estimated flags to mock data properties
    baseMock.transport = baseMock.transport.map(t => ({ ...t, isEstimated: true }));
    baseMock.stays = baseMock.stays.map(s => ({ ...s, isEstimated: true }));
    baseMock.itinerary = baseMock.itinerary.map(day => ({
      ...day,
      activities: day.activities.map(act => ({ ...act, isEstimated: true }))
    }));

    return baseMock;
  }

  // 2. COMPILE DYNAMIC LOCAL PLAN FOR CUSTOM ENTRY BY DELEGATING TO MODULAR SERVICES
  // Query each domain service independently to keep it clean and extensible
  const stays = await getStays({ destination: capDest, budgetLevel, duration, stayType });
  const transport = await getTransportOptions({ source: capSource, destination: capDest, budgetLevel, travelPref, optimization });
  const itinerary = await getItinerary({ destination: capDest, duration, vibe: interests.join(', ') || 'Leisure' });
  const { budgetEstimates, budgetBreakdown } = await calculateBudget({ stays, transport, duration, budgetLevel });

  return {
    destination: capDest,
    source: capSource,
    vibe: interests.join(', ') || 'Leisure',
    duration,
    budgetEstimates,
    budgetBreakdown,
    stays,
    transport,
    itinerary,
    searchParams: {
      source: capSource,
      destination: capDest,
      days: duration,
      month,
      groupSize,
      travelPref,
      optimization,
      budgetLevel,
      stayType,
      tripType,
      interests,
      tripStyle,
      avoid,
      totalBudget,
      budgetSplit,
      advanced
    }
  };
};
