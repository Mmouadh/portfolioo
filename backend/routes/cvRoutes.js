const express = require("express");
const CV = require("../models/CV");
const authMiddleware = require("../middleware/auth"); // <--- import JWT middleware
const { makeUpload, normalizeFilePath } = require("../config/uploads");

const router = express.Router();

// CV uploads (pdf/doc) - use Cloudinary raw or local disk fallback
const upload = makeUpload({
  folder: "cv",
  resourceType: "raw",
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (file.mimetype && !allowed.includes(file.mimetype)) {
      return cb(new Error("Only PDF, DOC, and DOCX files are allowed."), false);
    }
    cb(null, true);
  },
});

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
      path: normalizeFilePath(req.file),
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
      { filename: req.file.originalname, path: normalizeFilePath(req.file) },
      { new: true, upsert: true }
    );
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: "Failed to update CV" });
  }
});

module.exports = router;
