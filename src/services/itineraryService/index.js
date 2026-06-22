/**
 * Itinerary Service
 * Dynamic day-wise attraction and tour schedule builder.
 * Interface designed to support future third-party integrations (e.g. Google Places/Attractions APIs).
 */

const ACTIVITY_POOLS = {
  Adventure: [
    {
      time: "Morning",
      title: "Sunrise Peak Trek",
      description: "Hike up the popular mountain ridge trails of [Dest] early in the morning to catch a golden sunrise above the clouds.",
      cost: 200,
      tip: "Carry a flashlight and dress in layers."
    },
    {
      time: "Afternoon",
      title: "Outdoor Rock Climbing & Zipline",
      description: "Enjoy high-adrenaline outdoor sports at the certified adventure camp, featuring a 200m zipline crossing.",
      cost: 800,
      tip: "Wear closed-toe athletic shoes."
    },
    {
      time: "Evening",
      title: "Campsite Bonfire & Barbecue",
      description: "Unwind at the local campsite, sharing travel stories around a warm bonfire with grilled local delicacies.",
      cost: 500,
      tip: "Carry insect repellent."
    },
    {
      time: "Morning",
      title: "River Rafting Adventure",
      description: "Navigate class II & III rapids on the local [Dest] river rapids under the guidance of certified instructors.",
      cost: 1200,
      tip: "Bring a spare change of dry clothes."
    },
    {
      time: "Afternoon",
      title: "Mountain Biking Forest Exploration",
      description: "Rent a rugged mountain bike and ride through the scenic wilderness trails surrounding the town.",
      cost: 400,
      tip: "Ensure your helmet fits securely."
    },
    {
      time: "Evening",
      title: "Astro-Photography Night Walk",
      description: "Hike to a dark sky point outside [Dest] to capture stunning shots of the stars and night sky.",
      cost: 300,
      tip: "Bring a tripod for long exposure shots."
    }
  ],
  Cultural: [
    {
      time: "Morning",
      title: "Heritage Palace & Museum Tour",
      description: "Explore the ancient architecture, royal courtyard halls, and historical museum artifacts of [Dest].",
      cost: 300,
      tip: "Hire an official guide for detailed history."
    },
    {
      time: "Afternoon",
      title: "Handicrafts & Artisans Village",
      description: "Watch local craftsmen weave block-print textiles, throw clay pottery, and craft silver ornaments. Enjoy a regional lunch.",
      cost: 450,
      tip: "Bargaining is expected at artisan markets."
    },
    {
      time: "Evening",
      title: "Folk Dance & Music Performance",
      description: "Attend an evening amphitheater show showcasing regional history through traditional dances and musical instruments.",
      cost: 350,
      tip: "Arrive 15 minutes early to secure good seats."
    },
    {
      time: "Morning",
      title: "Ancient Fort Ruins Exploration",
      description: "Wander through the massive defensive walls, cannon bastions, and watchtowers overlooking [Dest].",
      cost: 250,
      tip: "Wear comfortable walking shoes."
    },
    {
      time: "Afternoon",
      title: "Local Culinary Cooking Class",
      description: "Learn to cook authentic regional dishes using traditional clay pots and stone-ground spices.",
      cost: 1000,
      tip: "Note down the recipes to try back home."
    },
    {
      time: "Evening",
      title: "Old Town Heritage Walk",
      description: "Stroll through the narrow historic lanes, admiring vintage wooden doorways and traditional house designs.",
      cost: 150,
      tip: "Great time for street photography."
    }
  ],
  Spiritual: [
    {
      time: "Morning",
      title: "Temple Morning Prayer Visit",
      description: "Visit the highly revered historical temple of [Dest]. Soak in the quiet morning spiritual atmosphere and hear the chants.",
      cost: 0,
      tip: "Dress modestly and remove footwear outside."
    },
    {
      time: "Afternoon",
      title: "Meditation & Yoga Ashram Ashram",
      description: "Participate in a guided breathing (Pranayama) and alignment yoga session led by senior practitioners.",
      cost: 400,
      tip: "Avoid heavy food at least 2 hours prior."
    },
    {
      time: "Evening",
      title: "Sacred Lake Aarti & Floating Lamps",
      description: "Gather at the holy steps (ghats) to witness the sunset prayer ritual with flaming brass lamps and floating flower plates.",
      cost: 100,
      tip: "Sit quietly and respect the ritual guidelines."
    },
    {
      time: "Morning",
      title: "Monastery Silent Walk",
      description: "Explore the peaceful Buddhist stupa or hillside meditation cave. spin the prayer wheels for positivity.",
      cost: 0,
      tip: "Walk around structures in a clockwise direction."
    },
    {
      time: "Afternoon",
      title: "Spiritual Text Library & Tea Session",
      description: "Read ancient scriptures in the quiet garden library and drink medicinal herbal teas.",
      cost: 200,
      tip: "Maintain absolute silence inside the library."
    },
    {
      time: "Evening",
      title: "Sufi Devotional Music (Qawwali)",
      description: "Listen to the soulful devotional songs echoing through the ancient shrine courtyard.",
      cost: 0,
      tip: "Head cover is required for both men and women."
    }
  ],
  Leisure: [
    {
      time: "Morning",
      title: "Botanical Gardens Leisure Stroll",
      description: "Walk through manicured green lawns, glasshouse botanical exhibits, and scenic pathways in [Dest].",
      cost: 120,
      tip: "Carry a book; there are plenty of shady benches."
    },
    {
      time: "Afternoon",
      title: "Boutique Cafe Hopping & Lunch",
      description: "Visit trending cafes to enjoy freshly brewed regional teas, artisanal bakes, and local organic lunches.",
      cost: 600,
      tip: "Try the house special desserts."
    },
    {
      time: "Evening",
      title: "Sunset Lake Boat Cruise",
      description: "Enjoy a tranquil evening boat ride as the sun goes down, reflecting warm colors on [Dest]'s water lines.",
      cost: 400,
      tip: "Book the 5:00 PM slot for the best lighting."
    },
    {
      time: "Morning",
      title: "Local Market Souvenir Shopping",
      description: "Browse colorful market alleys buying organic spices, handmade soap, essential oils, and local honey.",
      cost: 300,
      tip: "Check multiple shops to compare prices."
    },
    {
      time: "Afternoon",
      title: "Traditional Oil Massage Spa",
      description: "Rejuvenate with a relaxing full body aromatherapy massage at the certified organic wellness center.",
      cost: 1500,
      tip: "Book appointment 1 day in advance."
    },
    {
      time: "Evening",
      title: "Scenic Cliff Overlook Picnic",
      description: "Pack some fruits and bakeries and drive to the highest cliff view to watch the sunset over the valley.",
      cost: 200,
      tip: "Carry a light sweater as it gets windy."
    }
  ]
};

/**
 * Compiles a day-wise itinerary matching destination parameters.
 * @param {Object} params
 * @param {string} params.destination
 * @param {number} params.duration
 * @param {string} params.vibe
 * @param {string} [params.tripStyle]
 * @param {number} [params.budget]
 * @param {string} [params.travelMode]
 * @returns {Promise<Array>} day-wise itinerary list
 */
export async function getItinerary({ destination, duration, vibe, tripStyle, budget, travelMode }) {
  const capDest = destination.charAt(0).toUpperCase() + destination.slice(1);
  const itinerary = [];

  // For any custom destinations where data is unavailable, return placeholder days
  for (let d = 1; d <= duration; d++) {
    itinerary.push({
      day: d,
      theme: "More itinerary coming soon",
      activities: [
        {
          time: "Day Schedule",
          title: "More itinerary coming soon",
          description: `We are currently expanding our expert-curated paths for ${capDest}. Stay tuned!`,
          cost: 0,
          tip: "Check back later.",
          priceUnavailable: true
        }
      ]
    });
  }

  return itinerary;
}
