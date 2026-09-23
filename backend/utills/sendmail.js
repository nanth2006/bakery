import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOrderEmail = async (order) => {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  // App passwords from Gmail often have spaces like 'czqo mpur tdwk svqr' -> remove spaces
  const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").trim();

  if (!emailUser || !emailPass) {
    console.log("ℹ️ Email notification skipped: EMAIL_USER or EMAIL_PASS not configured in .env");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const itemsTable = (order.items || [])
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: 500;">${item.name}</td>
          <td style="padding: 10px; text-align: center;">${item.qty} ${item.unit || "kg"}</td>
          <td style="padding: 10px; text-align: right;">₹${item.rate * item.qty}</td>
        </tr>
      `
      )
      .join("");

    const orderNum = order.orderNumber || order._id || "SWT-ORDER";
    const mailOptions = {
      from: `"Nanthana Bakery" <${emailUser}>`,
      to: "nanthakumar2006geetha02@gmail.com",
      subject: `🎉 New Order Received #${orderNum} - ₹${order.totalAmount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBF7; border: 2px solid #E8A33D; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #4A1521; color: #FDFBF7; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">Nanthana Bakery</h1>
            <p style="margin: 5px 0 0; color: #E8A33D; font-size: 14px;">Freshly Handcrafted With Pure Desi Ghee</p>
          </div>
          
          <div style="padding: 24px;">
            <h2 style="color: #4A1521; margin-top: 0;">New Order Placed!</h2>
            <p><strong>Order ID:</strong> ${orderNum}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt || Date.now()).toLocaleString()}</p>
            
            <div style="background-color: #fff; border: 1px solid #C9A46A; border-radius: 8px; padding: 15px; margin: 15px 0;">
              <h3 style="margin-top: 0; color: #B0742D; font-size: 16px;">Customer Details:</h3>
              <p style="margin: 4px 0;"><strong>Name:</strong> ${order.address?.name || "Customer"}</p>
              <p style="margin: 4px 0;"><strong>Phone:</strong> ${order.address?.phone || "N/A"}</p>
              <p style="margin: 4px 0;"><strong>Address:</strong> ${order.address?.street || ""}, ${order.address?.city || ""} - ${order.address?.pincode || ""}</p>
              <p style="margin: 4px 0;"><strong>Payment:</strong> ${order.paymentMethod} (${order.paymentStatus || "Pending"})</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #E8A33D; color: #4A1521;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsTable}
              </tbody>
              <tfoot>
                <tr style="background-color: #F8EFE4; font-weight: bold;">
                  <td colspan="2" style="padding: 12px 10px; text-align: right; color: #4A1521;">Total Amount:</td>
                  <td style="padding: 12px 10px; text-align: right; color: #B0742D; font-size: 18px;">₹${order.totalAmount}</td>
                </tr>
              </tfoot>
            </table>

            <p style="text-align: center; color: #777; font-size: 12px; margin-top: 30px;">
              Thank you for serving happiness through sweets!
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order email #${orderNum} sent successfully ✅`);
  } catch (err) {
    console.error("Email sending note:", err.message);
  }
};
export const sendInquiryEmail = async (inquiry) => {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").trim();

  if (!emailUser || !emailPass) {
    console.log("ℹ️ Inquiry email skipped: EMAIL_USER or EMAIL_PASS not configured");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    const mailOptions = {
      from: `"Nanthana Bakery Inquiries" <${emailUser}>`,
      to: "nanthakumar2006geetha02@gmail.com",
      subject: `🎊 New Wedding/Bulk Inquiry from ${inquiry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBF7; border: 2px solid #E8A33D; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #4A1521; color: #FDFBF7; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">New Catering Inquiry</h1>
          </div>
          <div style="padding: 24px;">
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Event Type:</strong> ${inquiry.eventType}</p>
            <div style="background-color: #fff; border: 1px solid #C9A46A; border-radius: 8px; padding: 15px; margin-top: 15px;">
              <strong style="color: #B0742D;">Requirements:</strong>
              <p style="margin: 8px 0 0; color: #4A1521; line-height: 1.6;">${inquiry.message || 'No additional details provided'}</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Inquiry email from ${inquiry.name} sent successfully ✅`);
  } catch (err) {
    console.error("Inquiry email failed:", err.message);
  }
};