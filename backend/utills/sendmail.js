import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createTransporter = () => {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").trim();

  if (!emailUser || !emailPass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendOrderEmail = async (order) => {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  const adminEmail = (process.env.ADMIN_EMAIL || emailUser || "nanthakumar2006geetha02@gmail.com").trim();
  const customerEmail = (order.userEmail || order.address?.email || "").trim().toLowerCase();

  const transporter = createTransporter();
  if (!transporter) {
    console.warn("⚠️ Email notification skipped: EMAIL_USER or EMAIL_PASS not configured in environment variables");
    return { success: false, reason: "EMAIL_USER or EMAIL_PASS missing in environment variables" };
  }

  const orderNum = order.orderNumber || order._id || "SWT-ORDER";
  const itemsTable = (order.items || [])
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f0dfcd;">
        <td style="padding: 10px 8px; font-weight: 600; color: #4A1521;">${item.name}</td>
        <td style="padding: 10px 8px; text-align: center; color: #785E4F;">${item.qty} ${item.unit || "kg"}</td>
        <td style="padding: 10px 8px; text-align: right; color: #8C273B; font-weight: bold;">₹${item.rate * item.qty}</td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #FDFBF7; border: 2px solid #E8A33D; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(74,21,33,0.08);">
      <div style="background: linear-gradient(135deg, #4A1521 0%, #320E16 100%); color: #FDFBF7; padding: 26px 20px; text-align: center; border-bottom: 3px solid #E8A33D;">
        <h1 style="margin: 0; font-size: 26px; font-family: Georgia, serif; letter-spacing: 1px;">🍬 Nanthana Bakery</h1>
        <p style="margin: 6px 0 0; color: #E8A33D; font-size: 13px; font-weight: 500;">Freshly Handcrafted With 100% Pure Desi Ghee</p>
      </div>
      
      <div style="padding: 26px 22px;">
        <div style="background-color: #FAF1E4; border: 1px solid #E8A33D; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px;">
          <h2 style="color: #4A1521; margin: 0 0 6px 0; font-size: 18px;">🎉 Order Confirmation #${orderNum}</h2>
          <p style="margin: 0; font-size: 13px; color: #785E4F;">Order Date: <strong>${new Date(order.createdAt || Date.now()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</strong></p>
        </div>
        
        <div style="background-color: #ffffff; border: 1px solid #C9A46A; border-radius: 10px; padding: 16px; margin: 15px 0;">
          <h3 style="margin-top: 0; margin-bottom: 10px; color: #B0742D; font-size: 15px; border-bottom: 1px solid #FAF1E4; padding-bottom: 6px;">📦 Delivery & Customer Details</h3>
          <p style="margin: 4px 0; font-size: 14px; color: #4A1521;"><strong>Customer Name:</strong> ${order.address?.name || order.customerName || "Customer"}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #4A1521;"><strong>Phone:</strong> ${order.address?.phone || "N/A"}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #4A1521;"><strong>Address:</strong> ${order.address?.street || ""}, ${order.address?.city || ""} - ${order.address?.pincode || ""}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #4A1521;"><strong>Payment Method:</strong> ${order.paymentMethod || "COD"} <span style="background: #FAF1E4; color: #8C273B; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">${order.paymentStatus || "Pending"}</span></p>
          ${order.notes ? `<p style="margin: 6px 0 0; font-size: 13px; color: #785E4F; font-style: italic;"><strong>Note:</strong> ${order.notes}</p>` : ""}
        </div>

        <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 10px; overflow: hidden; margin-top: 15px; border: 1px solid #C9A46A;">
          <thead>
            <tr style="background-color: #E8A33D; color: #4A1521;">
              <th style="padding: 10px 8px; text-align: left; font-size: 13px;">Item</th>
              <th style="padding: 10px 8px; text-align: center; font-size: 13px;">Quantity</th>
              <th style="padding: 10px 8px; text-align: right; font-size: 13px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsTable}
          </tbody>
          <tfoot>
            ${order.discount ? `
            <tr style="background-color: #FAF1E4; font-size: 13px;">
              <td colspan="2" style="padding: 8px 10px; text-align: right; color: #047857; font-weight: 600;">Promotional Discount:</td>
              <td style="padding: 8px 10px; text-align: right; color: #047857; font-weight: bold;">-₹${order.discount}</td>
            </tr>` : ""}
            <tr style="background-color: #F8EFE4; font-weight: bold;">
              <td colspan="2" style="padding: 12px 10px; text-align: right; color: #4A1521; font-size: 15px;">Total Pay Amount:</td>
              <td style="padding: 12px 10px; text-align: right; color: #8C273B; font-size: 20px;">₹${order.totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 24px; padding: 14px; background-color: #FAF1E4; border-radius: 10px; text-align: center;">
          <p style="margin: 0; font-size: 13px; color: #4A1521; font-weight: 600;">
            🚚 Fast delivery within 2 hours • Freshness guaranteed!
          </p>
          <p style="margin: 4px 0 0; font-size: 12px; color: #785E4F;">
            Need help? Contact us: <a href="mailto:${adminEmail}" style="color: #8C273B; font-weight: bold;">${adminEmail}</a>
          </p>
        </div>

        <p style="text-align: center; color: #A88B77; font-size: 12px; margin-top: 20px; margin-bottom: 0;">
          Thank you for ordering with Nanthana Bakery! ✨
        </p>
      </div>
    </div>
  `;

  // Determine recipients: Admin + Customer (if valid email provided)
  const recipients = new Set();
  if (adminEmail) recipients.add(adminEmail);
  if (customerEmail && customerEmail.includes("@") && !customerEmail.endsWith(".local")) {
    recipients.add(customerEmail);
  }

  const recipientList = Array.from(recipients).join(", ");

  const mailOptions = {
    from: `"Nanthana Bakery" <${emailUser}>`,
    to: recipientList,
    subject: `🎉 Order Confirmation #${orderNum} - ₹${order.totalAmount} | Nanthana Bakery`,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Order email #${orderNum} successfully sent to: ${recipientList} (MessageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId, recipients: recipientList };
  } catch (err) {
    console.error(`❌ Order email #${orderNum} failed to send:`, err.message);
    return { success: false, error: err.message };
  }
};

export const sendInquiryEmail = async (inquiry) => {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  const adminEmail = (process.env.ADMIN_EMAIL || emailUser || "nanthakumar2006geetha02@gmail.com").trim();

  const transporter = createTransporter();
  if (!transporter) {
    console.warn("⚠️ Inquiry email skipped: EMAIL_USER or EMAIL_PASS not configured");
    return { success: false, reason: "EMAIL_USER or EMAIL_PASS missing" };
  }

  try {
    const mailOptions = {
      from: `"Nanthana Bakery Inquiries" <${emailUser}>`,
      to: adminEmail,
      subject: `🎊 New Catering / Bulk Inquiry from ${inquiry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBF7; border: 2px solid #E8A33D; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #4A1521; color: #FDFBF7; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">New Catering Inquiry</h1>
          </div>
          <div style="padding: 24px;">
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Event Type:</strong> ${inquiry.eventType || "Event / Function"}</p>
            <div style="background-color: #fff; border: 1px solid #C9A46A; border-radius: 8px; padding: 15px; margin-top: 15px;">
              <strong style="color: #B0742D;">Requirements:</strong>
              <p style="margin: 8px 0 0; color: #4A1521; line-height: 1.6;">${inquiry.message || 'No additional details provided'}</p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Inquiry email from ${inquiry.name} sent successfully to ${adminEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Inquiry email failed:", err.message);
    return { success: false, error: err.message };
  }
};

export const verifyEmailService = async () => {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").trim();

  if (!emailUser || !emailPass) {
    return {
      configured: false,
      message: "EMAIL_USER or EMAIL_PASS is missing in environment variables"
    };
  }

  const transporter = createTransporter();
  try {
    await transporter.verify();
    return {
      configured: true,
      emailUser,
      status: "SMTP Connected & Verified ✅"
    };
  } catch (err) {
    return {
      configured: true,
      emailUser,
      status: "SMTP Verification Failed ❌",
      error: err.message
    };
  }
};