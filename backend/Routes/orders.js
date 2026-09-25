import express from "express";
import Order from "../models/order.js";
import { sendOrderEmail, verifyEmailService } from "../utills/sendmail.js";

const router = express.Router();

// Diagnostic endpoint to test email configuration live
router.get("/test-email", async (req, res) => {
  try {
    const status = await verifyEmailService();
    res.status(200).json({
      success: true,
      service: "Email Diagnostics",
      environment: {
        EMAIL_USER_SET: !!process.env.EMAIL_USER,
        EMAIL_PASS_SET: !!process.env.EMAIL_PASS,
        EMAIL_USER_VALUE: process.env.EMAIL_USER || "NOT CONFIGURED IN RENDER"
      },
      status
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create new order
router.post("/orders", async (req, res) => {
  try {
    const { items, totalAmount, discount, address, paymentMethod, paymentStatus, userEmail, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one item" });
    }

    if (!address || !address.name || !address.phone || !address.street || !address.city) {
      return res.status(400).json({ success: false, message: "Complete delivery address is required" });
    }

    const customerEmail = (userEmail || address.email || "").trim().toLowerCase();

    const order = new Order({
      items,
      totalAmount,
      discount: discount || 0,
      address: {
        ...address,
        email: customerEmail
      },
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentStatus || (paymentMethod === "COD" ? "Pending" : "Awaiting Verification"),
      orderStatus: "Placed",
      userEmail: customerEmail,
      customerName: address.name,
      notes: notes || ""
    });

    const savedOrder = await order.save();

    // Dispatch email notification and await with error-catching
    let emailResult = null;
    try {
      emailResult = await sendOrderEmail(savedOrder);
    } catch (e) {
      console.error("Order email error:", e.message);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: savedOrder,
      emailStatus: emailResult
    });
  } catch (err) {
    console.error("Order Creation Error:", err);
    res.status(500).json({ success: false, error: "Order creation failed: " + err.message });
  }
});

// Get all orders (Admin view)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetching orders error:", err);
    res.status(500).json({ success: false, error: "Fetching orders failed: " + err.message });
  }
});

// Get customer's own orders by email
router.get("/orders/user/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();
    const userOrders = await Order.find({
      $or: [{ userEmail: email }, { "address.phone": email }]
    }).sort({ createdAt: -1 });

    res.status(200).json(userOrders);
  } catch (err) {
    console.error("User orders error:", err);
    res.status(500).json({ success: false, error: "Fetching user orders failed: " + err.message });
  }
});

// Update order status (Admin)
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus })
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order status updated!", order: updated });
  } catch (err) {
    console.error("Order status update error:", err);
    res.status(500).json({ success: false, error: "Failed to update order: " + err.message });
  }
});

// Delete / cancel order
router.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("Order delete error:", err);
    res.status(500).json({ success: false, error: "Failed to delete order: " + err.message });
  }
});

export default router;