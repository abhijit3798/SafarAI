import { GoogleGenerativeAI } from '@google/generative-ai';
import { mockTripsData } from './mockData.js';

// Clean the response text from the model to ensure it is raw JSON
const cleanJsonString = (rawText) => {
  let cleaned = rawText.trim();
  // Remove markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '');
  }
  return cleaned.trim();
};

/**
 * Generates a trip itinerary using the Gemini API.
 * Falls back to mock data if the API key is not present or if the destination is a known mock.
 * 
 * @param {Object} params
 * @param {string} params.source - Starting city (e.g. Mumbai, Delhi)
 * @param {string} params.destination - Destination city (India only)
 * @param {number} params.days - Number of days (1 to 10)
 * @param {string} params.vibe - Vibe/travel style (Solo, Couple, Family, Friends, Adventure, Spiritual, Leisure, Cultural)
 * @param {string} params.budgetLevel - Budget tier (Budget, Moderate, Luxury)
 * @param {string} params.apiKey - Optional user-supplied Gemini API key
 */
export const generateTripItinerary = async ({
  source,
  destination,
  days,
  vibe,
  budgetLevel,
  apiKey
}) => {
  // Use user-provided API key, or look in localStorage, or fall back
  const finalApiKey = apiKey || localStorage.getItem('safar_ai_gemini_key') || import.meta.env.VITE_GEMINI_API_KEY;

  const destKey = destination.toLowerCase().trim();

  // If no API key is available, attempt to serve from mock data or throw error
  if (!finalApiKey) {
    console.log("No API Key found. Checking mock database for:", destKey);
    // Find closest match in mock data
    const matchedKey = Object.keys(mockTripsData).find(key => 
      destKey.includes(key) || key.includes(destKey)
    );

    if (matchedKey) {
      // Return a copy of the mock data, adjusted for the duration requested
      const baseMock = JSON.parse(JSON.stringify(mockTripsData[matchedKey]));
      baseMock.source = source || baseMock.source;
      baseMock.vibe = vibe || baseMock.vibe;
      baseMock.duration = Math.min(days || baseMock.duration, baseMock.itinerary.length);
      baseMock.itinerary = baseMock.itinerary.slice(0, baseMock.duration);
      return baseMock;
    } else {
      // If no mock data matches and no key is provided, throw a descriptive error
      throw new Error(
        "NO_API_KEY: To plan a custom trip to '" + destination + "', please enter a Gemini API Key in the Profile tab (Settings). Alternatively, try planning a trip to Goa, Jaipur, Kerala, Leh Ladakh, Manali, or Varanasi to view demo data."
      );
    }
  }

  try {
    // Initialize the SDK
    const ai = new GoogleGenerativeAI(finalApiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are SafarAI, a premium AI travel planner specializing in travels within India.
Generate a comprehensive, highly realistic, and detailed travel itinerary and trip plan in India.

Trip Details:
- Source (Starting Location): ${source}
- Destination: ${destination}
- Duration: ${days} days
- Travel Vibe/Style: ${vibe}
- Budget Tier Selected: ${budgetLevel} (Use this to customize suggestions and price points)

You MUST respond ONLY with a raw, valid JSON object matching this exact TypeScript interface. Do NOT write any conversational text, explanations, or code block markers. Just return the raw JSON.

interface TripPlan {
  destination: string; // Destination name
  vibe: string; // The vibe of the trip
  duration: number; // Number of days
  source: string; // Source location
  budgetEstimates: {
    Budget: number; // Approximate total cost in INR for a budget trip for 1 person
    Moderate: number; // Approximate total cost in INR for a moderate trip for 1 person
    Luxury: number; // Approximate total cost in INR for a luxury trip for 1 person
  };
  budgetBreakdown: {
    stays: number; // Percentage of budget spent on stays (e.g. 40)
    transport: number; // Percentage spent on transport (e.g. 25)
    food: number; // Percentage spent on food (e.g. 20)
    activities: number; // Percentage spent on activities (e.g. 10)
    misc: number; // Percentage spent on misc (e.g. 5)
    // Sum of these must be exactly 100
  };
  stays: Array<{
    type: "Budget" | "Moderate" | "Luxury";
    name: string; // Realistic name of a hotel/homestay/hostel at this destination
    pricePerNight: number; // Estimated price per night in INR
    features: string[]; // 3-4 features (e.g. ["Free WiFi", "Pool", "Beach view"])
    location: string; // Area/neighborhood of the stay
    rating: number; // Out of 5.0 (e.g. 4.4)
  }>; // Provide exactly 1 stay for each budget category (Budget, Moderate, Luxury) - total 3 stays.
  transport: Array<{
    type: "Flight" | "Train" | "Bus/Cab";
    name: string; // Name of airline/train/bus line (e.g. "IndiGo (DEL to GOI)", "Vande Bharat Express")
    duration: string; // Travel duration (e.g. "2h 30m" or "12h 00m")
    cost: number; // Estimated price per person in INR (one way)
    recommendation: string; // Pro tip/recommendation for this transport
  }>; // Provide 2-3 realistic transport options from Source to Destination.
  itinerary: Array<{
    day: number;
    theme: string; // Theme of the day (e.g. "Exploring Heritage Forts")
    activities: Array<{
      time: "Morning" | "Afternoon" | "Evening";
      title: string; // Name of activity or place visited
      description: string; // 2-3 sentences explaining what to do, see, or eat there
      cost: number; // Approximate cost in INR for this activity (0 if free)
      tip: string; // Pro tip (e.g. "Buy tickets online to skip queue", "Try local lassi here")
    }>; // Provide exactly 3 activities per day (Morning, Afternoon, Evening)
  }>; // Provide exactly ${days} days of itinerary.
}

Crucial Requirements:
1. All costs, prices, and budgets must be in Indian Rupees (INR).
2. The hotels, trains, airlines, and tourist spots must be REAL and match the geography of India.
3. Keep the budgetEstimates and stay prices highly consistent. A budget trip should align with stay costs of ~800-1500 INR/night, moderate with ~3500-6000 INR/night, and luxury with ~15000-35000 INR/night.
4. Ensure the JSON is perfectly formatted, with no trailing commas, escaping double quotes correctly, and returning ONLY the valid JSON structure.
`;

    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] });
    const responseText = await result.response.text();
    const cleanJson = cleanJsonString(responseText);
    const parsedData = JSON.parse(cleanJson);
    
    // Validate required fields
    if (!parsedData.destination || !parsedData.itinerary || !Array.isArray(parsedData.itinerary)) {
      throw new Error("Invalid structure returned from AI.");
    }
    
    return parsedData;

  } catch (error) {
    console.error("Error generating trip with Gemini:", error);
    // If it's an API error due to invalid key, throw a user-friendly message
    if (error.message && (error.message.includes("API_KEY") || error.message.includes("API key"))) {
      throw new Error("INVALID_API_KEY: The Gemini API Key you provided appears to be invalid. Please check your credentials in the Profile tab.");
    }
    throw error;
  }
};
