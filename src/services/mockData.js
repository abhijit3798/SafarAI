// Pre-compiled rich database of popular Indian travel destinations.
// This matches the exact JSON schema we request from the Gemini AI model.

export const trendingDestinations = [
  {
    id: 'goa',
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    tagline: 'Sun, Sand & Seafood',
    description: 'Beautiful beaches, vibrant nightlife, Portuguese heritage, and spice plantations.',
    vibe: 'Leisure, Beach, Nightlife',
    defaultDays: 4,
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1477584305590-38772bfc3f3c?auto=format&fit=crop&w=400&q=80',
    tagline: 'The Pink City',
    description: 'Royal palaces, heritage forts, local handicrafts, and rich Rajasthani cuisine.',
    vibe: 'Cultural, Heritage, Shopping',
    defaultDays: 3,
  },
  {
    id: 'kerala',
    name: 'Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80',
    tagline: 'God\'s Own Country',
    description: 'Serene backwaters, lush tea estates in Munnar, beaches, and wellness tourism.',
    vibe: 'Nature, Leisure, Family',
    defaultDays: 5,
  },
  {
    id: 'leh',
    name: 'Leh Ladakh',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80',
    tagline: 'Land of High Passes',
    description: 'Stunning cold desert lakes, high altitude monasteries, adventure motorbiking.',
    vibe: 'Adventure, Nature, Spiritual',
    defaultDays: 6,
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    image: 'https://images.unsplash.com/photo-1561361531-99522c36d3f5?auto=format&fit=crop&w=400&q=80',
    tagline: 'The Spiritual Heart',
    description: 'Sacred Ganges ghats, evening Ganga Aarti, ancient temples, and narrow lanes.',
    vibe: 'Spiritual, Cultural, History',
    defaultDays: 3,
  },
  {
    id: 'manali',
    name: 'Manali',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80',
    tagline: 'Valley of the Gods',
    description: 'Snowy Solang Valley, Rohtang Pass adventure, paragliding, and cozy wooden cottages.',
    vibe: 'Adventure, Mountain, Couples',
    defaultDays: 4,
  }
];

export const mockTripsData = {
  "goa": {
    "destination": "Goa",
    "vibe": "Leisure, Beach, Nightlife",
    "duration": 4,
    "source": "Mumbai",
    "budgetEstimates": {
      "Budget": 12000,
      "Moderate": 25000,
      "Luxury": 65000
    },
    "budgetBreakdown": {
      "stays": 40,
      "transport": 25,
      "food": 20,
      "activities": 10,
      "misc": 5
    },
    "stays": [
      {
        "type": "Budget",
        "name": "Zostel Goa (Morjim)",
        "pricePerNight": 1200,
        "features": ["Social Vibe", "WiFi", "Dorms & Private Rooms", "Walkable to Beach"],
        "location": "North Goa",
        "rating": 4.5
      },
      {
        "type": "Moderate",
        "name": "BloomSuites | Calangute",
        "pricePerNight": 4500,
        "features": ["Pool", "Free Breakfast", "Modern Rooms", "Centrally Located"],
        "location": "Calangute",
        "rating": 4.3
      },
      {
        "type": "Luxury",
        "name": "Taj Exotica Resort & Spa",
        "pricePerNight": 18000,
        "features": ["Private Beach Access", "Infinity Pool", "Fine Dining", "Luxury Spa"],
        "location": "South Goa (Benaulim)",
        "rating": 4.8
      }
    ],
    "transport": [
      {
        "type": "Flight",
        "name": "IndiGo / Akasa Air (BOM to GOI)",
        "duration": "1h 15m",
        "cost": 3800,
        "recommendation": "Fastest and highly convenient option. Book 3 weeks in advance."
      },
      {
        "type": "Train",
        "name": "Madgaon Vande Bharat Express",
        "duration": "7h 45m",
        "cost": 1600,
        "recommendation": "Comfortable, fast, scenic route passing through western ghats tunnels."
      },
      {
        "type": "Bus/Cab",
        "name": "KSRTC / Private Sleeper AC Bus",
        "duration": "12h 00m",
        "cost": 1200,
        "recommendation": "Overnight option, budget friendly, saves a night's hotel cost."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Arrival & Sunset Beach Vibe",
        "activities": [
          {
            "time": "Morning",
            "title": "Check-in & Unwind",
            "description": "Arrive in Goa, check in to your stay, unpack and freshen up. Hire a scooter or car for the trip.",
            "cost": 500,
            "tip": "Scooters are available for ₹350-₹500/day. Ensure you wear a helmet to avoid traffic fines."
          },
          {
            "time": "Afternoon",
            "title": "Lunch at Vagator Beach & Chapora Fort",
            "description": "Have lunch at a cliff-side restaurant. Later, hike up Chapora Fort, famous from the movie 'Dil Chahta Hai'.",
            "cost": 800,
            "tip": "Carry sunglasses and sunscreen; the hike is short but hot."
          },
          {
            "time": "Evening",
            "title": "Sunset at Morjim Beach & Dinner",
            "description": "Watch a spectacular sunset at Morjim Beach. Wind down with dinner at a seaside shack with live music.",
            "cost": 1200,
            "tip": "Try local Goan fish curry-rice and Bebinca (a traditional dessert)."
          }
        ]
      },
      {
        "day": 2,
        "theme": "Heritage, Old Goa & Spice Plantations",
        "activities": [
          {
            "time": "Morning",
            "title": "Historical tour of Old Goa",
            "description": "Explore UNESCO World Heritage sites including Basilica of Bom Jesus (resting place of St. Francis Xavier) and Se Cathedral.",
            "cost": 100,
            "tip": "Dress modestly when entering the churches."
          },
          {
            "time": "Afternoon",
            "title": "Sahakari Spice Farm Guided Tour",
            "description": "Visit a spice plantation. Enjoy a traditional Goan buffet lunch served on banana leaves, followed by a spice walk.",
            "cost": 600,
            "tip": "You can opt for an elephant bath activity here if available."
          },
          {
            "time": "Evening",
            "title": "Panaji Latin Quarter (Fontainhas) Walk",
            "description": "Stroll around Fontainhas. Admire the colorful Portuguese-style houses and stop at a local bakery for pasteis de nata.",
            "cost": 400,
            "tip": "It is a photographer's paradise. Respect local residents' privacy while taking photos."
          }
        ]
      },
      {
        "day": 3,
        "theme": "South Goa Serenity & Dolphin Sighting",
        "activities": [
          {
            "time": "Morning",
            "title": "Dolphin Spotting Boat Ride",
            "description": "Take an early morning boat ride from Palolem Beach to watch dolphins in the wild and see Butterfly Island.",
            "cost": 800,
            "tip": "Start by 7:30 AM for the best chance of spotting dolphins."
          },
          {
            "time": "Afternoon",
            "title": "Relaxing at Palolem Beach",
            "description": "Lounge at the crescent-shaped Palolem beach. Grab lunch at a beach café and try some mocktails or fenny-based cocktails.",
            "cost": 1000,
            "tip": "Palolem beach is very safe for swimming."
          },
          {
            "time": "Evening",
            "title": "Sunset at Cabo de Rama Fort",
            "description": "Drive up to Cabo de Rama Fort. Watch the sunset over the Arabian Sea from the high fortress walls.",
            "cost": 200,
            "tip": "The drive is scenic but windy; finish the descent before it gets pitch dark."
          }
        ]
      },
      {
        "day": 4,
        "theme": "Water Sports & Departure",
        "activities": [
          {
            "time": "Morning",
            "title": "Water Sports at Calangute Beach",
            "description": "Participate in adventure activities: parasailing, jet-skiing, and banana boat rides.",
            "cost": 1500,
            "tip": "Always wear life jackets and book with certified operators only."
          },
          {
            "time": "Afternoon",
            "title": "Souvenir Shopping in Anjuna",
            "description": "Visit local shops in Anjuna/Calangute to buy cashew nuts, feni, spices, and beachwear.",
            "cost": 1000,
            "tip": "Bargaining is key in street markets. Start at 50% of the quoted price."
          },
          {
            "time": "Evening",
            "title": "Departure via Airport/Station",
            "description": "Head back to Mopa/Dabolim Airport or Madgaon Station. Bid farewell to the beach life.",
            "cost": 800,
            "tip": "Allow at least 2.5 hours transit time to Mopa airport from South Goa."
          }
        ]
      }
    ]
  },
  "jaipur": {
    "destination": "Jaipur",
    "vibe": "Cultural, Heritage, Shopping",
    "duration": 3,
    "source": "Delhi",
    "budgetEstimates": {
      "Budget": 8000,
      "Moderate": 18000,
      "Luxury": 45000
    },
    "budgetBreakdown": {
      "stays": 35,
      "transport": 20,
      "food": 25,
      "activities": 15,
      "misc": 5
    },
    "stays": [
      {
        "type": "Budget",
        "name": "Moustache Hostel Jaipur",
        "pricePerNight": 800,
        "features": ["Social Terrace", "Cafe", "Walking Tours", "AC Rooms"],
        "location": "MI Road",
        "rating": 4.6
      },
      {
        "type": "Moderate",
        "name": "Alsisar Haveli - Heritage Hotel",
        "pricePerNight": 5000,
        "features": ["Heritage Architecture", "Pool", "Courtyard Dining", "Puppet Shows"],
        "location": "Sansar Chandra Road",
        "rating": 4.4
      },
      {
        "type": "Luxury",
        "name": "The Rambagh Palace",
        "pricePerNight": 25000,
        "features": ["Royal Palace Stay", "Peacocks in Gardens", "Pristine Luxury Spa", "Vintage Car Rides"],
        "location": "Bhawani Singh Road",
        "rating": 4.9
      }
    ],
    "transport": [
      {
        "type": "Flight",
        "name": "Alliance Air / IndiGo (DEL to JAI)",
        "duration": "0h 55m",
        "cost": 3000,
        "recommendation": "Very quick, but driving is often preferred due to airport boarding overheads."
      },
      {
        "type": "Train",
        "name": "Ajmer Shatabdi / Double Decker Express",
        "duration": "4h 30m",
        "cost": 800,
        "recommendation": "Highly reliable, clean, includes snacks/breakfast on Shatabdi."
      },
      {
        "type": "Bus/Cab",
        "name": "NH48 Private AC Cab or RSRTC Volvo",
        "duration": "5h 30m",
        "cost": 1000,
        "recommendation": "Great road conditions. Cab costs around ₹4500 (one way) and is great for groups."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Palaces of the Pink City",
        "activities": [
          {
            "time": "Morning",
            "title": "Hawa Mahal & City Palace",
            "description": "Start early at Hawa Mahal (Palace of Winds) for photos, then walk to City Palace to see the royal museum and courtyards.",
            "cost": 500,
            "tip": "Buy a composite ticket to save money on entry fees across multiple Jaipur monuments."
          },
          {
            "time": "Afternoon",
            "title": "Jantar Mantar & Rajasthani Thali Lunch",
            "description": "Visit Jantar Mantar observatory, a UNESCO site. Head to LMB (Laxmi Mishthan Bhandar) for a rich Rajasthani Thali.",
            "cost": 900,
            "tip": "Hire a guide at Jantar Mantar to explain the solar/astronomical instruments."
          },
          {
            "time": "Evening",
            "title": "Shopping at Johari & Bapu Bazaar",
            "description": "Explore local bazaars for block-print textiles, blue pottery, gems, and silver jewelry.",
            "cost": 1000,
            "tip": "Bargaining is expected. Walk away politely if the price seems too high."
          }
        ]
      },
      {
        "day": 2,
        "theme": "Majestic Forts & Panoramic Views",
        "activities": [
          {
            "time": "Morning",
            "title": "Amer Fort Exploration",
            "description": "Drive to Amer. Explore the Sheesh Mahal (Mirror Palace) and royal halls. Enjoy views of Maota Lake.",
            "cost": 400,
            "tip": "Arrive by 9:00 AM to beat the tourist buses."
          },
          {
            "time": "Afternoon",
            "title": "Jaigarh Fort & Nahargarh Fort",
            "description": "Visit Jaigarh to see Jaivana (world's largest cannon on wheels). Have lunch at Nahargarh's Padao restaurant.",
            "cost": 600,
            "tip": "Nahargarh offers the absolute best panoramic view of Jaipur city."
          },
          {
            "time": "Evening",
            "title": "Sunset view & Dinner at Chokhi Dhani",
            "description": "Spend the evening at Chokhi Dhani, an ethnic village resort. Experience Rajasthani folk dances, camel rides, and traditional dining.",
            "cost": 1200,
            "tip": "Prepare to eat a lot. The hospitality here is legendarily heavy on ghee!"
          }
        ]
      },
      {
        "day": 3,
        "theme": "Temples, Crafts & Departure",
        "activities": [
          {
            "time": "Morning",
            "title": "Birla Mandir & Albert Hall Museum",
            "description": "Visit the beautiful white marble Birla Temple, then head to the Albert Hall Museum to see Indo-Saracenic architecture.",
            "cost": 200,
            "tip": "Albert Hall looks spectacular when illuminated; photography from outside is free."
          },
          {
            "time": "Afternoon",
            "title": "Galta Ji (Monkey Temple)",
            "description": "Explore the unique temple complex nestled in mountain crevices, known for its natural springs and monkey inhabitants.",
            "cost": 100,
            "tip": "Keep your belongings secure; the monkeys are quite active and look for food."
          },
          {
            "time": "Evening",
            "title": "Patrika Gate Photo & Departure",
            "description": "Stop at the highly colorful Patrika Gate for aesthetic photos, then catch your train or flight back.",
            "cost": 300,
            "tip": "Patrika Gate is on the way to the airport, making it a perfect final stop."
          }
        ]
      }
    ]
  },
  "kerala": {
    "destination": "Kerala (Munnar & Alleppey)",
    "vibe": "Nature, Leisure, Family",
    "duration": 5,
    "source": "Bangalore",
    "budgetEstimates": {
      "Budget": 15000,
      "Moderate": 30000,
      "Luxury": 80000
    },
    "budgetBreakdown": {
      "stays": 45,
      "transport": 20,
      "food": 15,
      "activities": 15,
      "misc": 5
    },
    "stays": [
      {
        "type": "Budget",
        "name": "Zostel Munnar / Alleppey Beach Hostel",
        "pricePerNight": 1000,
        "features": ["Social Spaces", "Budget Dining", "Backwater Views", "Hammocks"],
        "location": "Munnar & Alleppey",
        "rating": 4.5
      },
      {
        "type": "Moderate",
        "name": "Munnar Tea Country Resort / Lake Palace Alleppey",
        "pricePerNight": 5500,
        "features": ["Cottages", "Spas", "Tea Garden views", "Boat Cruises"],
        "location": "Munnar/Alleppey",
        "rating": 4.4
      },
      {
        "type": "Luxury",
        "name": "Kumarakom Lake Resort",
        "pricePerNight": 20000,
        "features": ["Luxury Houseboats", "Heritage Villas", "Meandering Pool", "Ayurvedic Spa"],
        "location": "Kumarakom (Near Alleppey)",
        "rating": 4.8
      }
    ],
    "transport": [
      {
        "type": "Flight",
        "name": "IndiGo (BLR to COK)",
        "duration": "1h 05m",
        "cost": 3200,
        "recommendation": "Fly to Kochi (COK), then rent a cab for Munnar (4 hrs drive) and Alleppey."
      },
      {
        "type": "Train",
        "name": "Ernakulam Express (KSR Bengaluru to Ernakulam)",
        "duration": "9h 30m",
        "cost": 950,
        "recommendation": "Overnight sleeper train is cozy and highly economical."
      },
      {
        "type": "Bus/Cab",
        "name": "KSRTC Swift AC Sleeper Bus",
        "duration": "10h 30m",
        "cost": 1100,
        "recommendation": "Overnight bus directly from Bangalore to Kochi or Munnar."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Arrive in Kochi & Drive to Munnar",
        "activities": [
          {
            "time": "Morning",
            "title": "Fort Kochi Walk",
            "description": "See Chinese Fishing Nets, St. Francis Church, and colorful streets of Jew Town in Fort Kochi.",
            "cost": 200,
            "tip": "Try local Kerala parotta with curry at a local restaurant."
          },
          {
            "time": "Afternoon",
            "title": "Scenic Drive to Munnar",
            "description": "Drive from Kochi to Munnar hill station. Stop at Cheeyappara and Valara waterfalls on the way.",
            "cost": 1500,
            "tip": "Keep motion sickness pills ready; the mountain roads have multiple hairpin turns."
          },
          {
            "time": "Evening",
            "title": "Check-in & Tea Estate Sunset",
            "description": "Check in to your hotel in Munnar. Walk through surrounding tea fields during sunset.",
            "cost": 300,
            "tip": "Temperature drops in the evening; carry a light jacket."
          }
        ]
      },
      {
        "day": 2,
        "theme": "Tea Trails & Peaks of Munnar",
        "activities": [
          {
            "time": "Morning",
            "title": "Mattupetty Dam & Eravikulam National Park",
            "description": "Spot the rare Nilgiri Tahr mountain goats in Eravikulam, and take a speed boat ride at Mattupetty Dam.",
            "cost": 600,
            "tip": "Book Eravikulam national park tickets online in advance to avoid long queues."
          },
          {
            "time": "Afternoon",
            "title": "Tea Museum Tour & Local Lunch",
            "description": "Learn about tea processing at Tata Tea Museum, followed by tea tasting. Grab Kerala style fish fry lunch.",
            "cost": 500,
            "tip": "Buy fresh spices (cardamom, cinnamon) and tea leaves directly from authorized outlets."
          },
          {
            "time": "Evening",
            "title": "Kathakali & Kalaripayattu Cultural Show",
            "description": "Attend traditional dance (Kathakali) and martial arts (Kalaripayattu) performances in Munnar town.",
            "cost": 400,
            "tip": "Arrive 20 mins early to secure front-row seats for photography."
          }
        ]
      },
      {
        "day": 3,
        "theme": "Drive to Alleppey & Houseboat Boarding",
        "activities": [
          {
            "time": "Morning",
            "title": "Drive down to Alleppey Backwaters",
            "description": "Check out from Munnar and drive to Alleppey, the Venice of the East.",
            "cost": 1800,
            "tip": "Check out early (around 8 AM) to reach Alleppey in time for houseboat check-in."
          },
          {
            "time": "Afternoon",
            "title": "Houseboat Check-in & Cruise",
            "description": "Board your private or shared traditional Kerala Houseboat (Kettuvallam). Enjoy fresh-cooked lunch onboard as you cruise through backwater canals.",
            "cost": 4500,
            "tip": "Houseboats operate on an 11:30 AM check-in and 9:00 AM check-out schedule."
          },
          {
            "time": "Evening",
            "title": "Sunset on the Lake & Traditional Dinner",
            "description": "Watch the sunset over Vembanad Lake. The houseboat docks in the evening. Enjoy Karimeen Pollichathu (pearl spot fish) dinner.",
            "cost": 1000,
            "tip": "Carry insect/mosquito repellent; they are very active over the backwaters at night."
          }
        ]
      },
      {
        "day": 4,
        "theme": "Shikhara Ride & Alleppey Beach",
        "activities": [
          {
            "time": "Morning",
            "title": "Morning Canoe/Shikhara Canal Cruise",
            "description": "Disembark from the houseboat and take a small country boat/shikhara ride deep into narrow canals where large houseboats cannot reach.",
            "cost": 800,
            "tip": "Canoes are peaceful and allow you to see local village life up close."
          },
          {
            "time": "Afternoon",
            "title": "Toddy Shop Lunch Experience",
            "description": "Visit a local toddy shop for lunch. Taste sweet coconut toddy (mild alcohol) along with spicy local curries.",
            "cost": 600,
            "tip": "The food is extremely spicy; ask for mild versions if you are sensitive."
          },
          {
            "time": "Evening",
            "title": "Sunset at Alleppey Beach & Lighthouse",
            "description": "Visit the 150-year-old pier at Alleppey beach, climb the lighthouse for panoramic views, and relax on the sand.",
            "cost": 200,
            "tip": "Lighthouse entry closes by 5:30 PM."
          }
        ]
      },
      {
        "day": 5,
        "theme": "Ayurveda Spa & Departure",
        "activities": [
          {
            "time": "Morning",
            "title": "Ayurvedic Abhyanga Massage",
            "description": "Experience a full-body rejuvenating Ayurvedic oil massage at a certified wellness center.",
            "cost": 1800,
            "tip": "Ensure the center is certified by Kerala Tourism (Olive/Green Leaf rating)."
          },
          {
            "time": "Afternoon",
            "title": "Kochi Marina Mall & Souvenirs",
            "description": "Drive back to Kochi. Stop for souvenir shopping (coir items, banana chips, wooden handicrafts).",
            "cost": 800,
            "tip": "Hot, fresh banana chips cooked in coconut oil are a must-buy."
          },
          {
            "time": "Evening",
            "title": "Departure from Kochi Airport",
            "description": "Head to Cochin International Airport or Ernakulam Station for your journey home.",
            "cost": 600,
            "tip": "Cochin airport is fully solar-powered; allow some time to admire its green infrastructure."
          }
        ]
      }
    ]
  },
  "leh": {
    "destination": "Leh Ladakh",
    "vibe": "Adventure, Nature, Spiritual",
    "duration": 6,
    "source": "Delhi",
    "budgetEstimates": {
      "Budget": 22000,
      "Moderate": 40000,
      "Luxury": 95000
    },
    "budgetBreakdown": {
      "stays": 30,
      "transport": 40,
      "food": 15,
      "activities": 10,
      "misc": 5
    },
    "stays": [
      {
        "type": "Budget",
        "name": "Himalayan Hostel / Local Homestays",
        "pricePerNight": 900,
        "features": ["Local Family Cooked Meals", "Warm Blankets", "Shared Lounge", "Ladakhi Tea"],
        "location": "Leh Main Market / Homestays",
        "rating": 4.7
      },
      {
        "type": "Moderate",
        "name": "The Grand Dragon Ladakh / Eco Cottages",
        "pricePerNight": 7000,
        "features": ["Central Heating", "Stunning Mountain Views", "Oxygen Cylinder Facility", "On-site Dining"],
        "location": "Leh / Nubra Valley",
        "rating": 4.5
      },
      {
        "type": "Luxury",
        "name": "The Ultimate Travelling Camp (TUTC)",
        "pricePerNight": 35000,
        "features": ["Glamping in Style", "Personal Butler", "Gourmet Dining", "Guided Excursions"],
        "location": "Thiksey / Diskit",
        "rating": 4.9
      }
    ],
    "transport": [
      {
        "type": "Flight",
        "name": "IndiGo / SpiceJet / Air India (DEL to IXL)",
        "duration": "1h 20m",
        "cost": 8500,
        "recommendation": "Fly early morning to Leh (IXL) airport. Offers legendary window views of snowcapped Himalayas."
      },
      {
        "type": "Train",
        "name": "No Direct Train",
        "duration": "N/A",
        "cost": 0,
        "recommendation": "No railway tracks exist in Ladakh. Nearest major station is Jammu Tawi, 700 km away."
      },
      {
        "type": "Bus/Cab",
        "name": "Private SUV (Scorpio / Innova) 4x4",
        "duration": "Multi-day road trip",
        "cost": 5000,
        "recommendation": "Required for visiting Pangong Lake & Nubra Valley. Expect to spend ₹18000-₹24000 total for a 4-day private cab hire."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Acclimatization Day (Crucial)",
        "activities": [
          {
            "time": "Morning",
            "title": "Arrive in Leh & Complete Rest",
            "description": "Check in to your hotel and rest completely. Do not engage in physical activity to allow your body to adapt to the thin air (11,500 ft).",
            "cost": 0,
            "tip": "Drink 4-5 liters of water. Avoid tea/coffee/alcohol. Take Diamox if recommended by your doctor."
          },
          {
            "time": "Afternoon",
            "title": "Light Rest & Acclimatization Room Stay",
            "description": "Continue resting. Reading or lying down is highly recommended.",
            "cost": 0,
            "tip": "Keep oxygen levels monitored; most hotels provide oximeters."
          },
          {
            "time": "Evening",
            "title": "Stroll in Leh Main Market",
            "description": "Take a very slow, gentle walk around Leh Main Market in the evening. Try local hot momos.",
            "cost": 300,
            "tip": "Avoid climbing stairs fast; walk at a relaxed pace."
          }
        ]
      },
      {
        "day": 2,
        "theme": "Local Monasteries & Magnetic Hill",
        "activities": [
          {
            "time": "Morning",
            "title": "Hall of Fame & Spituk Monastery",
            "description": "Visit the Army War Memorial (Hall of Fame) to learn about historical defense. Then visit Spituk Monastery overlooking the runway.",
            "cost": 150,
            "tip": "Hall of Fame has a great souvenir shop with high quality products."
          },
          {
            "time": "Afternoon",
            "title": "Magnetic Hill & Sangam (Confluence)",
            "description": "Experience the gravity-defying Magnetic Hill. Go further to witness the Sangam confluence of Indus and Zanskar rivers.",
            "cost": 500,
            "tip": "River rafting is available at Sangam in summers; it is chilly but thrilling!"
          },
          {
            "time": "Evening",
            "title": "Sunset at Shanti Stupa",
            "description": "Climb up to Shanti Stupa. Enjoy a panoramic view of Leh city as the sun goes down behind the mountains.",
            "cost": 100,
            "tip": "The steps to Shanti Stupa can be tiring; you can drive right up to the top instead of walking."
          }
        ]
      },
      {
        "day": 3,
        "theme": "Leh to Nubra Valley via Khardung La",
        "activities": [
          {
            "time": "Morning",
            "title": "Crossing Khardung La Pass",
            "description": "Drive towards Nubra Valley. Cross Khardung La (17,982 ft), one of the world's highest motorable roads.",
            "cost": 500,
            "tip": "Do not stay at the pass top for more than 15-20 minutes to avoid high-altitude sickness."
          },
          {
            "time": "Afternoon",
            "title": "Diskit Monastery & Giant Buddha",
            "description": "Arrive in Nubra. Visit the 14th century Diskit Monastery and marvel at the 106-ft tall statue of Maitreya Buddha.",
            "cost": 200,
            "tip": "The view of the Shyok river valley from the Buddha statue platform is mesmerizing."
          },
          {
            "time": "Evening",
            "title": "Bactrian Camel Ride at Hunder Dunes",
            "description": "Ride double-humped Bactrian camels through the white sand dunes of Hunder.",
            "cost": 600,
            "tip": "Double-humped camels are unique to this region (Silk Route heritage)."
          }
        ]
      },
      {
        "day": 4,
        "theme": "Nubra Valley to Pangong Lake via Shyok",
        "activities": [
          {
            "time": "Morning",
            "title": "Drive along Shyok River to Pangong",
            "description": "Take the scenic, adventurous route along the Shyok river towards the high altitude Pangong Tso lake.",
            "cost": 1500,
            "tip": "Ensure your cab driver is experienced; this route has water crossings during summers."
          },
          {
            "time": "Afternoon",
            "title": "First Sight of Pangong Tso",
            "description": "Arrive at Pangong Lake (13,940 ft). See the stunning shades of blue water spanning across the border into Tibet.",
            "cost": 200,
            "tip": "Enjoy hot Maggi at the lakeside stalls – a classic Himalayan travel experience."
          },
          {
            "time": "Evening",
            "title": "Stargazing at Pangong Campsite",
            "description": "Check into lakeside luxury tents or homestays in Spangmik. Walk by the lake at night and watch the Milky Way under zero-pollution skies.",
            "cost": 1000,
            "tip": "Pangong gets extremely cold at night, often dropping below 0°C even in summer. Layer heavily."
          }
        ]
      },
      {
        "day": 5,
        "theme": "Pangong Lake back to Leh via Chang La",
        "activities": [
          {
            "time": "Morning",
            "title": "Sunrise by Pangong & Chang La Crossing",
            "description": "Witness the pristine sunrise reflecting on the lake. Check out and drive back to Leh via Chang La Pass (17,590 ft).",
            "cost": 500,
            "tip": "Marmots can be spotted in the valleys near Chang La; do not feed them."
          },
          {
            "time": "Afternoon",
            "title": "Thiksey Monastery Visit",
            "description": "Visit Thiksey Monastery, which closely resembles the Potala Palace of Lhasa, Tibet. Grab lunch at the monastery cafe.",
            "cost": 400,
            "tip": "Taste Butter Tea (Gur-Gur Chai) at the cafe."
          },
          {
            "time": "Evening",
            "title": "Last Shopping Night in Leh",
            "description": "Buy prayer flags, singing bowls, apricot jams, and pashmina shawls from local Tibetan markets.",
            "cost": 1200,
            "tip": "Ensure you buy authentic Pashmina by doing the ring test or asking for certification."
          }
        ]
      },
      {
        "day": 6,
        "theme": "Departure",
        "activities": [
          {
            "time": "Morning",
            "title": "Airport Transfer & Departure",
            "description": "Catch your early morning flight out of Leh airport back to Delhi.",
            "cost": 500,
            "tip": "Security checks at Leh airport are highly detailed; reach 2.5 hours before flight time."
          }
        ]
      }
    ]
  }
};
