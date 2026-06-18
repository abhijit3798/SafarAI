import { generateLocalTripPlan } from '../services/localPlanner';

// Helper to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API Dispatcher Endpoint to generate travel plans.
 * Decouples the UI from the planning engines (Gemini AI vs. Local Templates).
 * 
 * @param {Object} params - Planner inputs and flags
 * @returns {Promise<import('../types').TripPlan>} Generated trip plan
 */
export async function fetchTripPlan(params) {
  console.log("[API] Dispatcher request:", params);
  
  // Simulate network latency (2 seconds) so loading steps render nicely
  await delay(2000);

  const fallbackDestination = params.destination || "Goa";
  const fallbackSource = params.source || "Delhi";
  const fallbackDuration = parseInt(params.days) || 4;

  try {
    const duration = parseInt(params.days) || 4;
    const destination = params.destination || "Goa";
    const source = params.source || "Delhi";

    // Always use the local template engine to prevent calling external APIs
    console.log("[API] Routing to Smart Local Templates Engine (API-Free Mode)...");
    const result = await generateLocalTripPlan({
      ...params,
      destination,
      source,
      days: duration
    });

    const id = params.id || `trip-${Date.now()}`;
    const summary = `${duration} Days in ${destination} from ${source}`;

    const formattedResult = {
      ...result,
      id,
      summary,
      transport: result.transport || [],
      stay: result.stays || [],
      itinerary: result.itinerary || [],
      budget: result.budgetBreakdown || { Travel: 7500, Stay: 8750, Food: 5000, Activities: 3750 },
      tips: result.itinerary ? result.itinerary.flatMap(d => d.activities.map(a => a.tip).filter(Boolean)) : ["Book tickets in advance."],
      score: 88
    };

    console.log("[API] Dispatcher resolution successful:", formattedResult.destination);
    return formattedResult;
  } catch (error) {
    console.error("[API] Dispatcher failed, loading fallback demo result:", error);
    
    // Fallback generation: return local demo result instead of throwing blocking errors
    const fallbackId = `trip-${Date.now()}`;

    return {
      id: fallbackId,
      destination: fallbackDestination,
      source: fallbackSource,
      duration: fallbackDuration,
      vibe: params.vibe || "Leisure",
      summary: `${fallbackDuration} Days in ${fallbackDestination} from ${fallbackSource}`,
      budgetEstimates: { Budget: 15000, Moderate: 25000, Luxury: 50000 },
      budgetBreakdown: { Travel: 7500, Stay: 8750, Food: 5000, Activities: 3750 },
      stays: [
        { name: "Silver Sands Beach Resort", type: "Resort", price: "₹3,500/night", rating: 4.2, description: "Beachfront comfort Resort.", isEstimated: true }
      ],
      stay: [
        { name: "Silver Sands Beach Resort", type: "Resort", price: "₹3,500/night", rating: 4.2, description: "Beachfront comfort Resort.", isEstimated: true }
      ],
      transport: [
        { type: "Flight", name: "IndiGo Flight", duration: "2h 30m", cost: 5500, recommendation: "Fastest travel route.", isEstimated: true }
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrive in " + fallbackDestination,
          activities: [
            { time: "Morning", title: "Arrive & Check-in", description: "Arrive at your destination.", tip: "Pre-arrange airport cab." },
            { time: "Evening", title: "Sunset Walk", description: "Relax by the scenic views.", tip: "Try local cuisine." }
          ]
        }
      ],
      budget: { Travel: 7500, Stay: 8750, Food: 5000, Activities: 3750 },
      tips: ["Pre-book entry tickets online.", "Carry light cotton clothing."],
      score: 85,
      searchParams: {
        source: fallbackSource,
        destination: fallbackDestination,
        days: fallbackDuration,
        month: params.month || "June",
        groupSize: params.groupSize || 1,
        travelPref: params.travelPref || "Any",
        optimization: params.optimization || "Balanced",
        budgetLevel: params.budgetLevel || "Moderate",
        stayType: params.stayType || "Hotel",
        tripType: params.tripType || "Solo",
        interests: params.interests || [],
        tripStyle: params.tripStyle || "Balanced",
        avoid: params.avoid || [],
        totalBudget: params.totalBudget || 25000,
        budgetSplit: params.budgetSplit || { travel: 30, stay: 35, food: 20, activities: 15 }
      }
    };
  }
}
