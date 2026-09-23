import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, default: "" }, // short description / ingredients
    category: {
      type: String,
      enum: ["Ghee Specials", "Bengali Mithai", "Kaju & Dry Fruit", "Traditional & Laddu", "Savory & Snacks", "General"],
      default: "General"
    },
    link: { type: String, default: "" }, // image url
    rate: { type: Number, required: true, min: 0 }, // price in INR
    qty: { type: Number, required: true, default: 10, min: 0 }, // stock in kg/boxes
    unit: { type: String, default: "kg" }, // kg, 500g, box
    badge: { type: String, default: "Fresh" }, // Best Seller, Pure Ghee, Chef's Choice, Fresh
    rating: { type: Number, default: 4.8, min: 1, max: 5 },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const sweet = mongoose.models.sweet || mongoose.model("sweet", sweetSchema);
export default sweet;