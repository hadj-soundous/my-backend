const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// DB (safe for Render)
const db = new Database(path.join(__dirname, "database.db"));

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
