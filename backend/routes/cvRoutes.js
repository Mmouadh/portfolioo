const express = require("express");
const multer = require("multer");
const path = require("path");
const CV = require("../models/CV");
const authMiddleware = require("../middleware/auth"); // <--- import JWT middleware

const router = express.Router();

// Multer setup for CV file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "cv-" + Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// GET /api/cv - Fetch CV data (can keep public or protect if you want)
router.get("/", async (req, res) => {
  try {
    const cv = await CV.findOne();
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CV" });
  }
});

// Protect all modifying routes with authMiddleware
router.post("/", authMiddleware, upload.single("cvFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const cv = new CV({
      filename: req.file.originalname,
      path: req.file.path,
    });
    await cv.save();
    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload CV" });
  }
});

router.put("/", authMiddleware, upload.single("cvFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const cv = await CV.findOneAndUpdate(
      {},
      { filename: req.file.originalname, path: req.file.path },
      { new: true, upsert: true }
    );
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: "Failed to update CV" });
  }
});

module.exports = router;