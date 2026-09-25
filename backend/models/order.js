import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    userEmail: { type: String, lowercase: true, trim: true },
    customerName: { type: String, default: "" },
    items: [
      {
        _id: { type: String },
        name: { type: String, required: true },
        rate: { type: Number, required: true },
        qty: { type: Number, required: true, default: 1 },
        link: { type: String },
        unit: { type: String, default: "kg" }
      }
    ],
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    address: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, default: "" },
      street: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: { type: String, default: "Pending" },
    orderStatus: {
      type: String,
      default: "Placed"
    },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

// Auto-generate human readable orderNumber if missing
orderSchema.pre("save", function () {
  if (!this.orderNumber) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    this.orderNumber = `SWT-${randomDigits}`;
  }
  if (!this.customerName && this.address?.name) {
    this.customerName = this.address.name;
  }
});

const order = mongoose.models.order || mongoose.model("order", orderSchema);
export default order;
