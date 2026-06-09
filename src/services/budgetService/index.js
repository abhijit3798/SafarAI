/**
 * Budget Service
 * Calculates expense estimations and breakdowns for planned trips.
 */

/**
 * Computes the total budget estimates and percentage breakdown.
 * @param {Object} params
 * @param {Array} params.stays
 * @param {Array} params.transport
 * @param {number} params.duration
 * @param {string} params.budgetLevel
 * @returns {Promise<Object>} Budget estimates and breakdown
 */
export async function calculateBudget({ stays, transport, duration, budgetLevel }) {
  // Calculates estimated ranges in INR based on typical spend profiles.
  const stayPrices = { Budget: 950, Moderate: 4200, Luxury: 17500 };

  const budgetEstimates = {
    Budget: (stayPrices.Budget * duration) + (950 * 2) + (1000 * duration),
    Moderate: (stayPrices.Moderate * duration) + (1350 * 2) + (2500 * duration),
    Luxury: (stayPrices.Luxury * duration) + (4600 * 2) + (6000 * duration)
  };

  const budgetBreakdown = {
    stays: 45,
    transport: 20,
    food: 15,
    activities: 15,
    misc: 5
  };

  return {
    budgetEstimates,
    budgetBreakdown
  };
}
