const express = require("express");
const router = express.Router();
const Contact = require("../schema/contact.model.js");
const nodemailer = require("nodemailer");

router.post("/message", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({ success: false, msg: "All fields required" });
    }

    // 1️⃣ Save to DB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // 2️⃣ Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3️⃣ Mail to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,   // ✅ changed
      to: process.env.EMAIL_USER,
      replyTo: email,                 // ✅ added
      subject: "New Contact Message",
      html: `
        <h3>New Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // 4️⃣ Auto reply to USER
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting us. We have received your message.</p>
        <p>We will get back to you soon.</p>
      `,
    });

    res.json({ success: true, msg: "Message sent successfully!" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Something went wrong" });
  }
});

module.exports = router;