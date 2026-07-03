const express = require("express");

const router = express.Router();

const sendContactEmail = require("../services/emailService");

const verifyTurnstile = require("../middleware/verifyTurnstile");

module.exports = (db) => {

    router.post("/", verifyTurnstile, async (req, res) => {

        try {

            const { name, email, message } = req.body;

            if (!name || !email || !message) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required."
                });
            }

            await db.run(
                `INSERT INTO contacts(name,email,message)
                 VALUES(?,?,?)`,
                [name, email, message]
            );

            await sendContactEmail({
    name,
    email,
    message
});

            res.status(201).json({
                success: true,
                message: "Message sent successfully!"
            });

        } catch (err) {

            console.error(err);

            res.status(500).json({
                success: false,
                message: "Server Error"
            });

        }

    });

    return router;
};