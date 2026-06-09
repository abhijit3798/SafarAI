/**
 * SafarAI Trip Cache & Cost Optimization Manager.
 * Uses local storage to cache generated plans and prevent duplicate API costs/runs.
 */

/**
 * Computes a standardized cache key based on search inputs.
 * @param {string} source - Starting location
 * @param {string} destination - Trip destination
 * @param {number|string} days - Duration of the trip
 * @param {string} tripTypeOrVibe - Style or vibe of the trip (e.g. Solo, Family, Cultural)
 * @returns {string} Standardized cache key
 */
export const getCacheKey = (source, destination, days, tripTypeOrVibe) => {
  const s = (source || '').toLowerCase().trim();
  const d = (destination || '').toLowerCase().trim();
  const dy = parseInt(days) || 4;
  
  // Extract primary vibe/type if composite (e.g. "Solo (Flight Preferred)" -> "solo")
  let t = (tripTypeOrVibe || '').toLowerCase().trim();
  if (t.includes('(')) {
    t = t.split('(')[0].trim();
  }
  
  return `${s}_${d}_${dy}_${t}`;
};

/**
 * Fetches a cached trip from localStorage if it exists.
 * @param {string} source
 * @param {string} destination
 * @param {number|string} days
 * @param {string} tripTypeOrVibe
 * @returns {Object|null} Cached trip plan or null
 */
export const getCachedTrip = (source, destination, days, tripTypeOrVibe) => {
  try {
    const key = getCacheKey(source, destination, days, tripTypeOrVibe);
    const cache = JSON.parse(localStorage.getItem('safar_ai_trip_cache') || '{}');
    const cachedPlan = cache[key];
    
    if (cachedPlan) {
      console.log(`[Cache] Match found for key: ${key}`);
      return cachedPlan;
    }
    return null;
  } catch (e) {
    console.error("[Cache] Failed to read trip cache:", e);
    return null;
  }
};

/**
 * Saves a trip plan to both the cache store and the general saved trips archive.
 * @param {string} source
 * @param {string} destination
 * @param {number|string} days
 * @param {string} tripTypeOrVibe
 * @param {Object} tripData - The generated trip plan object
 * @returns {Object} The updated plan with cache metadata
 */
export const saveTripToCache = (source, destination, days, tripTypeOrVibe, tripData) => {
  try {
    const key = getCacheKey(source, destination, days, tripTypeOrVibe);
    const cache = JSON.parse(localStorage.getItem('safar_ai_trip_cache') || '{}');
    
    const timestamp = new Date().toISOString();
    const cachedPlan = {
      ...tripData,
      cachedAt: timestamp,
      cacheKey: key,
      // Store search criteria so we can prefill if we regenerate
      searchParams: {
        source,
        destination,
        days: parseInt(days) || 4,
        tripTypeOrVibe
      }
    };
    
    // 1. Update cache store
    cache[key] = cachedPlan;
    localStorage.setItem('safar_ai_trip_cache', JSON.stringify(cache));
    console.log(`[Cache] Plan cached under key: ${key}`);

    // 2. Add to Saved Trips Archive (for My Trips history) if not already there
    const savedTrips = JSON.parse(localStorage.getItem('safar_ai_saved_trips') || '[]');
    const existingIndex = savedTrips.findIndex(t => t.id === tripData.id || t.cacheKey === key);
    
    if (existingIndex !== -1) {
      // Update existing saved trip
      savedTrips[existingIndex] = {
        ...savedTrips[existingIndex],
        ...cachedPlan,
        timestamp
      };
    } else {
      // Add as new saved trip
      savedTrips.unshift({
        ...cachedPlan,
        timestamp
      });
    }
    localStorage.setItem('safar_ai_saved_trips', JSON.stringify(savedTrips));
    
    return cachedPlan;
  } catch (e) {
    console.error("[Cache] Failed to write trip cache:", e);
    return tripData;
  }
};
