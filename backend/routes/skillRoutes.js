const express = require("express");
const Skill = require("../models/Skill");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET /api/skills - Fetch all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// GET /api/skills/:id - Fetch a single skill
router.get("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skill" });
  }
});

// POST /api/skills - Create a new skill
router.post("/", authMiddleware, upload.single("iconFile"), async (req, res) => {
  try {
    const { name, level, icon } = req.body;
    let skillData = { name, level };

    if (req.file) {
      skillData.icon = `http://localhost:5000/uploads/${req.file.filename}`;
    } else if (icon) {
      skillData.icon = icon;
    }

    const skill = new Skill(skillData);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: "Failed to create skill" });
  }
});

// PUT /api/skills/:id - Update a skill
router.put("/:id", authMiddleware, upload.single("iconFile"), async (req, res) => {
  try {
    const { name, level, icon } = req.body;
    let updateData = { name, level };

    if (req.file) {
      updateData.icon = `http://localhost:5000/uploads/${req.file.filename}`;
    } else if (icon) {
      updateData.icon = icon;
    }

    const skill = await Skill.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: "Failed to update skill" });
  }
});

// DELETE /api/skills/:id - Delete a skill
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

module.exports = router;