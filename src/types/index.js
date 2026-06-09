/**
 * JSDoc specifications for the SafarAI core data shapes.
 * This file serves as a reference for components and services,
 * making future TypeScript conversion straightforward.
 */

/**
 * @typedef {Object} BudgetBreakdown
 * @property {number} stays - Percentage of budget spent on stays (e.g. 40)
 * @property {number} transport - Percentage spent on transport (e.g. 25)
 * @property {number} food - Percentage spent on food (e.g. 20)
 * @property {number} activities - Percentage spent on activities (e.g. 10)
 * @property {number} misc - Percentage spent on misc (e.g. 5)
 */

/**
 * @typedef {Object} BudgetEstimates
 * @property {number} Budget - Cost for budget travelers (INR)
 * @property {number} Moderate - Cost for moderate travelers (INR)
 * @property {number} Luxury - Cost for luxury travelers (INR)
 */

/**
 * @typedef {Object} StayOption
 * @property {"Budget" | "Moderate" | "Luxury"} type - Budget tier
 * @property {string} name - Hotel name
 * @property {number} pricePerNight - Nightly rate in INR
 * @property {string[]} features - Hotel facilities list
 * @property {string} location - Locality area
 * @property {number} rating - Customer review score (0.0 to 5.0)
 */

/**
 * @typedef {Object} TransportOption
 * @property {"Flight" | "Train" | "Bus/Cab"} type - Transit mode
 * @property {string} name - Carrier line name
 * @property {string} duration - Journey duration (e.g. '2h 15m')
 * @property {number} cost - Route pricing per seat (INR)
 * @property {string} recommendation - Custom tip for booking
 */

/**
 * @typedef {Object} ActivityItem
 * @property {"Morning" | "Afternoon" | "Evening"} time - Schedule block
 * @property {string} title - Sights/Tour title
 * @property {string} description - Core paragraph details
 * @property {number} cost - Ticket pricing (INR, 0 for free)
 * @property {string} tip - Contextual recommendation
 */

/**
 * @typedef {Object} DaySchedule
 * @property {number} day - Day index (1-indexed)
 * @property {string} theme - Thematic focus of the day
 * @property {ActivityItem[]} activities - 3 activities planned
 */

/**
 * @typedef {Object} TripPlan
 * @property {string} id - Unique identifier (local reference)
 * @property {string} timestamp - Generation ISO string
 * @property {string} destination - City name
 * @property {string} source - Start city name
 * @property {string} vibe - Traveler vibe category
 * @property {string} budgetLevel - Traveler budget level selection
 * @property {number} duration - Days duration
 * @property {BudgetEstimates} budgetEstimates - Cost estimates
 * @property {BudgetBreakdown} budgetBreakdown - Segmented percentages
 * @property {StayOption[]} stays - Lodging recommendation array
 * @property {TransportOption[]} transport - Route suggestions
 * @property {DaySchedule[]} itinerary - Day timeline array
 */
export const SchemaReference = {};
