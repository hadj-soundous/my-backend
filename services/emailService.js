const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendContactEmail = async ({ name, email, message }) => {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject: `📩 New Portfolio Message from ${name}`,

        html: `
            <h2>New Contact Message</h2>

            <p><b>Name:</b> ${name}</p>

            <p><b>Email:</b> ${email}</p>

            <p><b>Message:</b></p>

            <p>${message}</p>
        `
    });

};

module.exports = sendContactEmail;