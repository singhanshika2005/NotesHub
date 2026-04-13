const express = require("express");
const app = express();
const connectToDB = require("./database");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

// ✅ Connect DB
connectToDB();

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// ==============================
// ✅ ROUTES
// ==============================

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

// Profile (🔥 Avatar + Profile handled here)
app.use("/api/v3.2/profile", require("./router/profile.routes"));

// ==============================
// ✅ START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});