/**
 * Transport Service
 * Handles querying route and transit costs.
 * Interface designed to support future third-party integrations (e.g. Skyscanner, Amadeus, IRCTC).
 */

/**
 * Retrieves transport routes between source and destination.
 * @param {Object} params
 * @param {string} params.source
 * @param {string} params.destination
 * @param {string} params.budgetLevel
 * @returns {Promise<Array>} List of transport options
 */
export async function getTransportOptions({ source, destination, budgetLevel, travelPref = 'Any', optimization = 'Balanced' }) {
  // Returns mock data with estimated values sorted/filtered based on optimization constraints.
  const capDest = destination.charAt(0).toUpperCase() + destination.slice(1);

  const options = [
    {
      type: "Flight",
      name: `IndiGo / Air India (DEL to ${capDest.slice(0, 3).toUpperCase()})`,
      duration: "2h 10m",
      durationHours: 2.16,
      cost: 4600,
      recommendation: `Fly to the nearest regional airport, then take an app cab to ${capDest}.`,
      isEstimated: true,
      priceUnavailable: true
    },
    {
      type: "Train",
      name: `${capDest} Shatabdi / Vande Bharat Express`,
      duration: "6h 45m",
      durationHours: 6.75,
      cost: 1350,
      recommendation: "Highly reliable, includes meals, scenic route. Pre-book early.",
      isEstimated: true,
      priceUnavailable: true
    },
    {
      type: "Bus/Cab",
      name: "AC Sleeper Multi-Axle Bus",
      duration: "10h 15m",
      durationHours: 10.25,
      cost: 950,
      recommendation: "Overnight travel option. Economical and saves a hotel night room cost.",
      isEstimated: true,
      priceUnavailable: true
    }
  ];

  let finalOptions = [...options];

  if (travelPref === 'Car') {
    finalOptions = [
      {
        type: "Car",
        name: `Private AC Cab / Self-Drive (DEL to ${capDest})`,
        duration: "8h 30m",
        durationHours: 8.5,
        cost: 3800,
        recommendation: "Enjoy flexibility, pitstops at highways. Great for groups.",
        isEstimated: true,
        priceUnavailable: true
      },
      ...options
    ];
  } else if (travelPref !== 'Any') {
    // Reorder so that the preferred option is at the top
    finalOptions.sort((a, b) => {
      if (a.type.toLowerCase().includes(travelPref.toLowerCase())) return -1;
      if (b.type.toLowerCase().includes(travelPref.toLowerCase())) return 1;
      return 0;
    });
  }

  // Sort based on optimization
  if (optimization === 'Cheapest') {
    finalOptions.sort((a, b) => a.cost - b.cost);
  } else if (optimization === 'Fastest') {
    finalOptions.sort((a, b) => a.durationHours - b.durationHours);
  }

  return finalOptions;
}
