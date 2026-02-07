const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://betopiacodb:TqDeOG5YNYcdHYEs@betopiadata.8ku1gnb.mongodb.net/betopiacodb?retryWrites=true&w=majority&appName=betopiaData";
const dbName = "betopiacodb";

const promotions = [
  {
    title: "Buy One Get One Buffet",
    description: "Enjoy B1G1 free buffet deals with StanChart credit card",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1554306274-fbf3872509b1?q=80&w=100&auto=format&fit=crop",
    tnc: [
      "Offer valid only for dine-in.",
      "Prior reservation recommended.",
      "Cannot be combined with other offers.",
    ],
    applicability: "Standard Chartered Credit Card Holders",
    website: "www.example-restaurant.com",
    hotline: "+880 1234 567890",
    partner: "Platter Restaurant",
    location: "Banani, Dhaka 1213",
  },
  {
    title: "Pedal your way with a brand new ride.",
    description:
      "Avail 0% InstaBuys on new bicycles from CycleLife Exclusive and Duranta Bicycle.",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1623519967208-a53272e5057b?q=80&w=100&auto=format&fit=crop",
    tnc: [
      "Minimum purchase value 10,000 BDT.",
      "0% interest for up to 6 months.",
    ],
    applicability: "All Credit Card Holders",
    website: "www.cyclelife.com",
    hotline: "+880 1711 223344",
    partner: "CycleLife Exclusive",
    location: "Tejgaon, Dhaka 1208",
  },
  {
    title: "Dazzle everyone around you.",
    description:
      "Buy your desired jewellery from top brands and pay in up to 24 equal monthly instalments at 0% interest.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1616618147690-e5bea43c8f37?q=80&w=100&auto=format&fit=crop",
    tnc: ["Valid on diamond jewellery only.", "Processing fee may apply."],
    applicability: "Prime Bank Credit Cards",
    website: "www.sparkle-gems.com",
    hotline: "+880 1999 888777",
    partner: "Sparkle Gems",
    location: "Gulshan-1, Dhaka 1212",
  },
  {
    title: "Give your home a fresh makeover.",
    description:
      "Decorate your home with trendy furniture items. Buy from renowned brands and pay in up to 24 months equal monthly instalments.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=100&auto=format&fit=crop",
    tnc: ["Delivery charges applicable.", "Installation included."],
    applicability: "Dutch-Bangla Bank Cards",
    website: "www.home-decor.com",
    hotline: "+880 1555 666777",
    partner: "Home Decor Ltd.",
    location: "Uttara, Dhaka 1230",
  },
  {
    title: "Buy from the comfort of your home.",
    description:
      "Purchase brand new electronics & home appliances online and pay in up to 24 months equal monthly instalments at 0% interest.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1594412258909-3286dc757341?q=80&w=100&auto=format&fit=crop",
    tnc: ["Manufacturer warranty applies.", "No returns on opened items."],
    applicability: "City Bank American Express",
    website: "www.tech-shop.com.bd",
    hotline: "+880 1888 999000",
    partner: "TechShop BD",
    location: "Elephant Road, Dhaka 1205",
  },
  {
    title: "Transform your closet",
    description:
      "Shop the latest fashion trends and upgrade your wardrobe with exclusive discounts.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=100&auto=format&fit=crop",
    tnc: ["Discount on selected items only.", "VAT excluded."],
    applicability: "BRAC Bank Card Holders",
    website: "www.fashion-hub.com",
    hotline: "+880 1666 555444",
    partner: "Fashion Hub",
    location: "Jamuna Future Park, Dhaka 1229",
  },
  {
    title: "Let every flavor tell a story",
    description:
      "Experience culinary delights at top-rated restaurants with special offers.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=100&auto=format&fit=crop",
    tnc: ["Valid for dinner only.", "Max discount 2000 BDT."],
    applicability: "EBL Visa & Mastercard",
    website: "www.foodie-paradise.com",
    hotline: "+880 1333 444555",
    partner: "Foodie Paradise",
    location: "Dhanmondi, Dhaka 1209",
  },
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("promotions");

    // Clear existing
    await collection.deleteMany({});

    // Insert new
    await collection.insertMany(
      promotions.map((p) => ({ ...p, createdAt: new Date() })),
    );

    console.log("Successfully seeded promotions!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();
