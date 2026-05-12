require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Debug logs (to confirm env is loaded)
console.log("Starting server...");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded" : "Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

// 🔹 Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// 🔹 Verify transporter (VERY IMPORTANT)
transporter.verify((error, success) => {
    if (error) {
        console.error("Transporter error:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

// 🔹 Test route
app.get('/', (req, res) => {
    res.send("🚀 Server is alive and running!");
});

// 🔹 Contact route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // safer than using user input
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact: ${subject}`,
            text: `
New message from your website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");
        res.status(200).json({ success: 'Message sent successfully!' });

    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

// 🔹 Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});