import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./Routes/authRoutes.js";
import sweetRoutes from "./Routes/sweetRoutes.js";
import orderRoute from "./Routes/orders.js";
import Sweet from "./models/sweet.js";
import inquiry from "./Routes/inquiry.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", sweetRoutes);
app.use("/api", orderRoute);
app.use("/api",inquiry)

// Root healthcheck
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "🍬 Sweet Store API is running smoothly!",
    endpoints: ["/api/auth/login", "/api/auth/register", "/api/getProduct", "/api/addProduct", "/api/orders", "/api/test-email"]
  });
});

// Seed Initial Sweets if DB has none
const seedInitialSweets = async () => {
  try {
    const count = await Sweet.countDocuments();
    if (count === 0) {
      console.log("Seeding sample sweets data...");
      const sampleSweets = [
        {
          name: "Kaju Katli (Royal Cashew Diamond)",
          title: "Made from premium Goan cashews and edible silver leaf (Vark). Melt-in-mouth texture.",
          category: "Kaju & Dry Fruit",
          rate: 850,
          qty: 25,
          unit: "kg",
          badge: "Best Seller",
          rating: 4.9,
          link: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Pure Ghee Mysore Pak",
          title: "Authentic royal South Indian delicacy prepared with 100% pure desi ghee & gram flour.",
          category: "Ghee Specials",
          rate: 680,
          qty: 20,
          unit: "kg",
          badge: "Pure Ghee",
          rating: 5.0,
          link: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Motichoor Special Laddu",
          title: "Golden pearl pearls made in desi ghee infused with saffron, cardamom & roasted pistachios.",
          category: "Traditional & Laddu",
          rate: 520,
          qty: 35,
          unit: "kg",
          badge: "Festive Favorite",
          rating: 4.8,
          link: "https://images.unsplash.com/photo-1605197148560-6316f7fb4f04?auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Royal Gulab Jamun",
          title: "Soft khoya dumplings dipped in fragrant rose and saffron sugar syrup. Served warm.",
          category: "Ghee Specials",
          rate: 450,
          qty: 30,
          unit: "kg",
          badge: "Chef's Choice",
          rating: 4.9,
          link: "https://images.unsplash.com/photo-1589119908995-c6837fa14d48?auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Spongy Kolkata Rasgulla",
          title: "Classic chenna balls cooked in light cardamom syrup. Incredibly juicy and refreshing.",
          category: "Bengali Mithai",
          rate: 420,
          qty: 25,
          unit: "kg",
          badge: "Fresh Daily",
          rating: 4.7,
          link: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Kesar Rasmalai (4 Pcs)",
          title: "Soft cottage cheese patties soaked in thickened saffron milk garnished with almonds.",
          category: "Bengali Mithai",
          rate: 280,
          qty: 18,
          unit: "box",
          badge: "Chilled Special",
          rating: 4.9,
          link: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Tirunelveli Ghee Halwa",
          title: "Traditional wheat milk halwa slow-cooked in copper vessels with authentic country ghee.",
          category: "Ghee Specials",
          rate: 720,
          qty: 15,
          unit: "kg",
          badge: "Heritage",
          rating: 4.9,
          link: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Special Mixture (Savory)",
          title: "Crispy snack blend with cashews, peanuts, curry leaves, and secret spice blend.",
          category: "Savory & Snacks",
          rate: 380,
          qty: 40,
          unit: "kg",
          badge: "Crispy Delight",
          rating: 4.7,
          link: "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?auto=format&fit=crop&w=600&q=80"
        }
      ];
      await Sweet.insertMany(sampleSweets);
      console.log("Sample sweets added successfully ✅");
    }
  } catch (err) {
    console.log("Seeding note:", err.message);
  }
};

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully ✅");
    await seedInitialSweets();
    app.listen(PORT, () => {
      console.log(`🍬 Sweet Store server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err.message);
  });