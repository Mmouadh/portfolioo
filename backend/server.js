// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { uploadRoot } = require("./config/uploads");

// Import routes
const aboutRoutes = require("./routes/aboutRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const cvRoutes = require("./routes/cvRoutes");
const authRoutes = require("./routes/auth");
const testimonialRoutes = require("./routes/testimonialRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors()); // You can add origin: 'http://localhost:3000' if frontend runs separately
app.use(express.json());

// Make uploads folder public for CV preview/download
app.use("/uploads", express.static(uploadRoot));

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/analytics", analyticsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend running");
});

/* ---------------- DATABASE CONNECTION ---------------- */
let isConnecting = false;
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected
  if (isConnecting) return; // prevent duplicate attempts
  isConnecting = true;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  } finally {
    isConnecting = false;
  }
};

// Only start an HTTP listener in traditional server environments.
if (!process.env.VERCEL) {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

// Export for serverless environments (Vercel)
module.exports = { app, connectDB, uploadRoot };
