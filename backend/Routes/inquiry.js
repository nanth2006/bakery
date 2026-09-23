import express from "express";
import { sendInquiryEmail } from "../utills/sendmail.js";

const router = express.Router();

router.post('/inquiry', async (req, res) => {
  try {
    const { name, phone, eventType, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone required' });
    }

    await sendInquiryEmail({ name, phone, eventType, message });

    res.status(200).json({ success: true, message: 'Inquiry sent successfully' });
  } catch (err) {
    console.error("Inquiry error:", err);
    res.status(500).json({ success: false, message: 'Failed to send inquiry' });
  }
});

export default router;