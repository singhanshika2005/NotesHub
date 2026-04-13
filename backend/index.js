const express = require("express");
const app = express();
const connectToDB = require("./database");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

// ==============================
// ✅ CONNECT DB
// ==============================
connectToDB();

// ==============================
// ✅ MIDDLEWARE
// ==============================
app.use(express.json());
app.use(cors({ origin: "*" }));

// ==============================
// ✅ API ROUTES
// ==============================

// Home
app.get("/", (req, res) => {
  res.send("Welcome to MyNoteBook App 🚀");
});

// Auth
app.use("/api/v3.2/auth", require("./router/auth.router"));

// Notes
app.use("/api/v3.2/note", require("./router/note.router"));

// Contact
app.use("/api/v3.2/contact", require("./router/contact.router"));

// Reviews
app.use("/api/v3.2/reviews", require("./router/review.routes"));

// Profile
app.use("/api/v3.2/profile", require("./router/profile.routes"));

// ==============================
// ✅ FRONTEND (React Build Serve)
// ==============================

// 🔥 Serve frontend build files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 🔥 Handle React routing (VERY IMPORTANT FIX)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ==============================
// ✅ START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});