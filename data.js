// ============================================
// FarmStay — Static Data
// ============================================

const FARMHOUSES = [
  {
    id: 1,
    name: "The Golden Harvest Estate",
    location: "Hyderabad",
    area: "Shamirpet, 35km from city",
    price: 8500,
    rating: 4.8,
    reviews: 124,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=700&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=700&q=80",
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=700&q=80"
    ],
    description: "Nestled amidst sprawling mango orchards and paddy fields, The Golden Harvest Estate offers an authentic farmhouse experience just 35km from Hyderabad. Wake up to rooster calls, enjoy fresh farm-to-table breakfasts, and spend evenings around crackling bonfires. The property spans 12 acres with a stunning heritage bungalow, private pool, and working farm where guests can participate in seasonal harvests.",
    amenities: ["Pool", "WiFi", "AC", "Bonfire", "BBQ", "Parking", "Kitchen", "Farm Tours"],
    maxGuests: 12,
    bedrooms: 5,
    bathrooms: 4,
    featured: true
  },
  {
    id: 2,
    name: "Malabar Spice Farm Retreat",
    location: "Wayanad",
    area: "Vythiri, Kerala",
    price: 11000,
    rating: 4.9,
    reviews: 87,
    badge: "Superhost",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&q=80",
      "https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?w=700&q=80",
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=700&q=80",
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=700&q=80"
    ],
    description: "A magical spice plantation retreat deep in the Western Ghats, surrounded by cardamom, pepper, and vanilla vines. The misty mornings, guided spice walks, and ayurvedic cuisine make this an unforgettable wellness escape. Our cottages are built from reclaimed teak and feature private forest-view balconies. Ideal for couples and families seeking authentic Kerala farm life.",
    amenities: ["WiFi", "Bonfire", "Ayurvedic Spa", "Farm Tours", "Cycling", "Trekking", "Organic Meals"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4,
    featured: true
  },
  {
    id: 3,
    name: "Coorg Coffee Plantation House",
    location: "Coorg",
    area: "Madikeri, Karnataka",
    price: 9800,
    rating: 4.7,
    reviews: 203,
    badge: "Best Value",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
      "https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?w=700&q=80",
      "https://images.unsplash.com/photo-1454486837617-ce8e1310d920?w=700&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80"
    ],
    description: "A century-old Kodava estate surrounded by 200 acres of coffee and orange plantations. Experience the earthy aroma of fresh coffee beans each morning, take guided plantation walks, and enjoy traditional Coorg cuisine cooked by our in-house chef. The colonial bungalow retains its original teak furniture and antique charm while offering modern comforts.",
    amenities: ["Pool", "WiFi", "AC", "BBQ", "Coffee Tours", "Trekking", "Birdwatching", "Parking"],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 3,
    featured: true
  },
  {
    id: 4,
    name: "Nilgiri Meadows Farmstay",
    location: "Ooty",
    area: "Kotagiri, Tamil Nadu",
    price: 6500,
    rating: 4.6,
    reviews: 156,
    badge: "New",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80"
    ],
    description: "High in the Nilgiri hills at 2200m altitude, this organic tea and vegetable farm offers crisp mountain air, misty valley views, and soul-nourishing peace. The property grows over 40 varieties of vegetables organically, and guests are welcome to pick their own produce for meals. Cozy stone cottages with fireplaces make chilly evenings magical.",
    amenities: ["Bonfire", "Fireplace", "Organic Farm", "Tea Tours", "Hiking", "Birdwatching"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    featured: false
  },
  {
    id: 5,
    name: "Lonavala Valley Farm Villa",
    location: "Lonavala",
    area: "Khandala, Maharashtra",
    price: 14000,
    rating: 4.5,
    reviews: 78,
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=700&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80"
    ],
    description: "A premium farm villa perched above the Khandala valley with breathtaking monsoon views. The 8-acre property features a heated infinity pool overlooking the valley, a mulberry orchard, herb garden, and a full outdoor kitchen. Perfect for large family gatherings and corporate retreats, with dedicated staff and chef service available.",
    amenities: ["Pool", "WiFi", "AC", "Bonfire", "BBQ", "Chef Service", "Parking", "Event Space"],
    maxGuests: 20,
    bedrooms: 8,
    bathrooms: 6,
    featured: true
  },
  {
    id: 6,
    name: "Konkan Coconut Grove Stay",
    location: "Alibaug",
    area: "Revdanda, Maharashtra",
    price: 7200,
    rating: 4.4,
    reviews: 95,
    badge: null,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=700&q=80",
      "https://images.unsplash.com/photo-1517320964276-a6235e3b76b7?w=700&q=80",
      "https://images.unsplash.com/photo-1580228624284-60fcdb671eb5?w=700&q=80"
    ],
    description: "A serene coastal farmstay set amidst coconut groves and cashew plantations just 2km from the Alibaug beach. The property offers authentic Konkan hospitality with freshly caught seafood, coconut-based farm activities, and stunning beach-side sunsets. Experience traditional Konkan fishing with local fishermen or simply relax in a hammock between the palms.",
    amenities: ["WiFi", "BBQ", "Beach Access", "Fishing", "Cycling", "Parking", "Sea Food"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    featured: false
  },
  {
    id: 7,
    name: "Deccan Sunrise Farmhouse",
    location: "Pune",
    area: "Mulshi, Maharashtra",
    price: 5500,
    rating: 4.3,
    reviews: 112,
    badge: null,
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=700&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&q=80",
      "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=700&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=80"
    ],
    description: "An accessible and affordable farmstay just 45km from Pune, situated by the Mulshi Lake. The 5-acre property grows grapes, pomegranates, and seasonal vegetables. Enjoy morning yoga by the lake, bullock-cart rides, and evening folk music sessions. Great value for families and groups seeking a quick weekend getaway.",
    amenities: ["WiFi", "Bonfire", "AC", "Parking", "Bullock Cart", "Yoga", "Swimming"],
    maxGuests: 14,
    bedrooms: 6,
    bathrooms: 4,
    featured: false
  },
  {
    id: 8,
    name: "Telangana Heritage Farm",
    location: "Hyderabad",
    area: "Vikarabad, 70km from city",
    price: 4800,
    rating: 4.2,
    reviews: 67,
    badge: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
      "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=700&q=80",
      "https://images.unsplash.com/photo-1570996079596-98f5af2fc79e?w=700&q=80"
    ],
    description: "Step back into rural Telangana with this authentic heritage farmstay featuring traditional mud-plaster walls, terracotta roofing, and an expansive pongal paddy farm. The property is run by a third-generation farming family who share their agricultural traditions with guests. Participate in traditional planting, cooking on clay stoves, and evening veena performances.",
    amenities: ["Bonfire", "BBQ", "Farm Tours", "Cultural Shows", "Parking", "Organic Meals"],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 3,
    featured: false
  }
];

const TESTIMONIALS = [
  {
    name: "Ananya Krishnamurthy",
    location: "Bengaluru",
    text: "FarmStay completely changed our vacation planning. We spent a weekend at the Coorg estate and it was the most rejuvenating experience our family has had in years. The coffee plantation walk was extraordinary.",
    rating: 5,
    farm: "Coorg Coffee Plantation House"
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    text: "Booked the Lonavala villa for my parents' anniversary. The staff, the views, the food — everything was exceptional. Seamless booking process and the payment was super easy. Will definitely return.",
    rating: 5,
    farm: "Lonavala Valley Farm Villa"
  },
  {
    name: "Priya Venkataraman",
    location: "Hyderabad",
    text: "Golden Harvest Estate is a gem. My kids finally put their screens down and spent two days helping with farm chores and playing in the fields. That alone was worth every rupee.",
    rating: 5,
    farm: "The Golden Harvest Estate"
  },
  {
    name: "Karan Singh",
    location: "Delhi",
    text: "The Wayanad spice farm is surreal. We woke up to mist every morning and fell asleep to jungle sounds. The ayurvedic spa add-on was a perfect touch. Booking was a breeze.",
    rating: 5,
    farm: "Malabar Spice Farm Retreat"
  },
  {
    name: "Divya Nair",
    location: "Chennai",
    text: "Took my parents to the Nilgiri Meadows stay. The fresh mountain air, picking vegetables, and the cozy fireside evenings were perfect. My mother still talks about the food.",
    rating: 4,
    farm: "Nilgiri Meadows Farmstay"
  },
  {
    name: "Arjun Bose",
    location: "Kolkata",
    text: "The Alibaug coconut grove was so peaceful. Ate the freshest seafood, fell asleep to ocean sounds, and woke up to coconut trees swaying outside my window. Absolute bliss.",
    rating: 4,
    farm: "Konkan Coconut Grove Stay"
  }
];

// Ratings data (used by reviews section)
const SAMPLE_REVIEWS = {
  1: [
    { author: "Meena R.", date: "March 2025", rating: 5, text: "Absolutely spectacular stay. The pool overlooking the mango orchard, the bonfire under stars — it's a complete reset for city-fatigued souls.", tags: ["Scenic Views", "Great Host", "Clean & Tidy"] },
    { author: "Vikas P.", date: "February 2025", rating: 5, text: "Second time here and still can't get enough. The hosts are warm, the farm breakfast is incredible, and it's just the right distance from Hyderabad.", tags: ["Good Food", "Value for Money", "Great Host"] },
    { author: "Shweta M.", date: "January 2025", rating: 4, text: "Very good experience overall. Kids loved the farm tour. Slight delay with check-in but host apologized and made up for it.", tags: ["Kid-Friendly", "Fun Activities"] }
  ],
  2: [
    { author: "Rajan K.", date: "April 2025", rating: 5, text: "Best farmstay I've ever done. The mist, the spices, the food, the hosts — perfection in every sense.", tags: ["Scenic Views", "Good Food", "Great Host"] },
    { author: "Anita B.", date: "March 2025", rating: 5, text: "The ayurvedic spa and spice walk were the highlights. Felt completely recharged after 3 nights here.", tags: ["Clean & Tidy", "Fun Activities"] }
  ],
  3: [
    { author: "Sameer T.", date: "April 2025", rating: 5, text: "The coffee plantation is magical. 200 acres of pure green bliss with a host family that treats you like their own.", tags: ["Scenic Views", "Great Host", "Good Food"] },
    { author: "Lakshmi N.", date: "March 2025", rating: 4, text: "Loved the heritage bungalow and the coffee tour. The pool was slightly smaller than expected but everything else was wonderful.", tags: ["Clean & Tidy", "Value for Money"] },
    { author: "Dev S.", date: "February 2025", rating: 5, text: "Went for a corporate team getaway. Perfect for groups. The outdoor cooking session was hilarious and delicious.", tags: ["Fun Activities", "Great Host", "Good Food"] }
  ]
};
