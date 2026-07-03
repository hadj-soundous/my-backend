const axios = require("axios");

const verifyTurnstile = async (req, res, next) => {
    try {

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Captcha is required."
            });
        }

        const response = await axios.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET,
                response: token
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        if (!response.data.success) {
            return res.status(400).json({
                success: false,
                message: "Captcha verification failed."
            });
        }

        next();

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Captcha verification error."
        });

    }
};

module.exports = verifyTurnstile;