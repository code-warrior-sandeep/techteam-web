const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const nodemailer = require("nodemailer");
const contactMessage = require("../models/contactMessage");

router.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

router.get("/privacy", (req, res) => {
  res.render("students/privacy.ejs");
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save contact message to DB
    const newContact = new contactMessage({
      senderName: name,
      senderEmail: email,
      problemSub: subject,
      problem: message
    });

    await newContact.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bcatechteams@gmail.com",
        pass: process.env.MESSAGE_KEY, 
      },
    });

    const mailOptions = {
      from: "bcatechteams@gmail.com",
      to: email,
      subject: "Thank You for Contacting Us!",
      text: `Thank you ${name}! We have received your submission. Our team will get back to you soon.`,
      html: `<html>
  <body style="background-color: #eef2f7; padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 14px; padding: 35px; box-shadow: 0 6px 18px rgba(0,0,0,0.08);">

      <!-- Header -->
      <h1 style="font-size: 24px; color: #2f855a; margin-bottom: 10px;">✅ Thank You, ${name}!</h1>
      <p style="font-size: 16px; color: #4a5568; line-height: 1.6;">
        We've received your submission successfully. Our team is currently reviewing it and will get back to you soon.
      </p>

      <!-- Info Box -->
      <div style="background-color: #f0fdf4; padding: 20px; border-left: 4px solid #38a169; margin: 25px 0; border-radius: 8px;">
        <p style="margin: 0; font-size: 15px; color: #2d3748;">
          Need help sooner? You can reply directly to this email or visit our support page below.
        </p>
      </div>

     <h4>Best Regards-</h4>
      <!-- Footer -->
      <p style="font-size: 14px; color: #718096; margin-top: 40px;">
        — BCA Tech Team
      </p>

    </div>
  </body>
</html>
`
    };

    await transporter.sendMail(mailOptions);

    req.flash("success", "Message sent successfully!");
    res.redirect("/contact");

  } catch (err) {
    console.error("Error in contact form:", err);
    req.flash("error", "Message failed to send.");
    res.redirect("/contact");
  }
});

module.exports = router;
