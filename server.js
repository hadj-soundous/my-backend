const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const basicAuth = require("express-basic-auth");
dotenv.config();

const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

(async () => {

    const db = await connectDB();

    app.use("/api/contact", require("./routes/contactRoutes")(db));
    app.use(
    "/admin",
    basicAuth({
        users: {
            admin: "Soundous2026"
        },
        challenge: true
    }),
    require("./routes/adminRoutes")(db)
);
    app.get("/", (req, res) => {
    app.use("/admin",

basicAuth({

users:{

admin:"Soundous2026"

},

challenge:true

}),

require("./routes/adminRoutes")(db)

);

        res.json({
            success: true,
            message: "Portfolio Backend Running 🚀"
        });

    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {

        console.log(`🚀 Server running on http://localhost:${PORT}`);

    });

})();
