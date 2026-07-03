const express = require("express");

const router = express.Router();

const sendContactEmail = require("../services/emailService");
const verifyTurnstile = require("../middleware/verifyTurnstile");

module.exports = (db) => {

    router.post("/", async (req, res) => {

        try {

            console.log("✅ 1. Request received");

            const { name, email, message } = req.body;

            if (!name || !email || !message) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required."
                });
            }

            console.log("✅ 2. Inserting into SQLite");

            await db.run(
                `INSERT INTO contacts(name,email,message)
                 VALUES(?,?,?)`,
                [name, email, message]
            );

            console.log("✅ 3. Saved to SQLite");

            console.log("✅ 4. Sending email");

            await sendContactEmail({
                name,
                email,
                message
            });

            console.log("✅ 5. Email sent");

            res.status(201).json({
                success: true,
                message: "Message sent successfully!"
            });

        } catch (err) {

            console.error("❌ CONTACT ERROR");
            console.error(err);

            res.status(500).json({
                success: false,
                message: "Server Error"
            });

        }

    });

    return router;
};