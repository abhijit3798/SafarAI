/**
 * Hotel Service
 * Handles hotel and stays recommendations.
 * Interface designed to support future third-party integrations (e.g. Booking.com, TripAdvisor).
 */

/**
 * Retrieves stay options for a destination.
 * @param {Object} params
 * @param {string} params.destination
 * @param {string} params.budgetLevel
 * @param {number} params.duration
 * @returns {Promise<Array>} List of stay options
 */
export async function getStays({ destination, budgetLevel, duration, stayType = 'Hotel' }) {
  // Returns mock hotel options matching standard tiers and stay types.
  const capDest = destination.charAt(0).toUpperCase() + destination.slice(1);
  const stayPrices = { Budget: 950, Moderate: 4200, Luxury: 17500 };

  const typeName = stayType.charAt(0).toUpperCase() + stayType.slice(1);

  return [
    {
      type: "Budget",
      name: `${capDest} Backpackers ${typeName}`,
      pricePerNight: stayPrices.Budget,
      features: [`Cozy ${typeName} rooms`, "Social Vibe", "Free High-speed WiFi", "Walkable to center"],
      location: "Near Market Center",
      rating: 4.6,
      isEstimated: true
    },
    {
      type: "Moderate",
      name: `Boutique ${typeName} ${capDest}`,
      pricePerNight: stayPrices.Moderate,
      features: ["Complimentary Breakfast", "Free WiFi", `Modern ${typeName} units`, "Room Service"],
      location: "Town Center",
      rating: 4.4,
      isEstimated: true
    },
    {
      type: "Luxury",
      name: `The Grand Heritage ${typeName} & Spa ${capDest}`,
      pricePerNight: stayPrices.Luxury,
      features: ["Infinity Swimming Pool", "Balcony Scenic Views", "Fine Dining", "Wellness Spa"],
      location: "Scenic Hill Outskirts",
      rating: 4.8,
      isEstimated: true
    }
  ];
}
