const CV = require("../models/CV");

// GET latest CV
exports.getLatestCV = async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ uploadedAt: -1 }); // newest first
    if (!cv) return res.status(404).json({ message: "No CV found" });
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPLOAD new CV
exports.uploadCV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const cv = new CV({
      filename: req.file.originalname,
      path: req.file.path
    });

    await cv.save();
    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};