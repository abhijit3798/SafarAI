/**
 * SafarAI Trip Analytics Helper.
 * Computes scores, extracts places of interest, and compiles travel tips dynamically.
 */

/**
 * Calculates a gamified Trip Score based on planning configurations.
 * @param {Object} tripData 
 * @returns {Object} Score details
 */
export function calculateTripScore(tripData) {
  let score = 88; // base score

  // 1. Adjust based on duration
  const days = parseInt(tripData.duration) || 4;
  if (days >= 3 && days <= 6) {
    score += 4; // Optimal vacation duration
  } else {
    score += 2;
  }

  // 2. Adjust based on stays ratings
  if (tripData.stays && tripData.stays.length > 0) {
    const avgRating = tripData.stays.reduce((acc, curr) => acc + (curr.rating || 4), 0) / tripData.stays.length;
    if (avgRating >= 4.5) {
      score += 4;
    } else {
      score += 2;
    }
  }

  // 3. Adjust based on vibe
  const vibe = (tripData.vibe || '').toLowerCase();
  let analysis = [];
  if (vibe.includes('solo')) {
    analysis.push("Eco-friendly transit mapping");
    analysis.push("Budget-optimized hostel routing");
  } else if (vibe.includes('family')) {
    analysis.push("Kid-friendly pacing score: High");
    analysis.push("Private transport recommendations active");
  } else {
    analysis.push("Well-spaced transit buffers");
    analysis.push("Clustered geographical itinerary routes");
  }

  // Cap score at 99
  score = Math.min(99, score);

  let grade = "Good";
  if (score >= 95) grade = "Excellent";
  else if (score >= 90) grade = "Very Good";

  return {
    score,
    grade,
    bulletPoints: [
      ...analysis,
      "Includes verified local transport rates",
      "Features vetted safety tips for sight-seeing"
    ]
  };
}

/**
 * Extracts key landmarks and places of interest from the itinerary.
 * @param {Object} tripData 
 * @returns {Array} List of place names and short descriptions
 */
export function extractPlacesToVisit(tripData) {
  if (!tripData.itinerary || tripData.itinerary.length === 0) return [];

  const places = [];
  const seen = new Set();

  tripData.itinerary.forEach(day => {
    day.activities.forEach(act => {
      // Typically morning and afternoon activities are primary landmarks
      if (act.time !== 'Evening' && act.title) {
        // Clean titles to represent place name
        let name = act.title
          .replace(/^(Check-in & |Explore |Visit |Historical tour of |Trek to |Morning |Afternoon )/i, '')
          .split(' at ')[0]
          .split(' with ')[0]
          .trim();
        
        if (name.length > 3 && !seen.has(name.toLowerCase())) {
          seen.add(name.toLowerCase());
          places.push({
            name,
            description: act.description
          });
        }
      }
    });
  });

  return places.slice(0, 5); // Limit to top 5 places
}

/**
 * Compiles and de-duplicates tips across all itinerary days.
 * @param {Object} tripData 
 * @returns {Array} List of compiled tips
 */
export function compileTripTips(tripData) {
  const tips = [];
  const seen = new Set();

  // 1. Gather tips from activities
  if (tripData.itinerary) {
    tripData.itinerary.forEach(day => {
      day.activities.forEach(act => {
        if (act.tip && act.tip.length > 5) {
          const cleanTip = act.tip.trim();
          if (!seen.has(cleanTip.toLowerCase())) {
            seen.add(cleanTip.toLowerCase());
            tips.push(cleanTip);
          }
        }
      });
    });
  }

  // 2. Add standard safety fallback tips if the compiled list is short
  const standardTips = [
    "Prefer bottled mineral water during outdoor sightseeing.",
    "Pre-book monument entry tickets online to bypass ticket counters.",
    "Carry light cash, as smaller tea stalls and auto-cabs may not accept digital payments."
  ];

  standardTips.forEach(tip => {
    if (tips.length < 5 && !seen.has(tip.toLowerCase())) {
      tips.push(tip);
    }
  });

  return tips.slice(0, 6);
}
