const express = require("express");
const Skill = require("../models/Skill");
const { makeUpload, normalizeFilePath } = require("../config/uploads");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

const upload = makeUpload({ folder: "skills", resourceType: "image" });

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
      skillData.icon = normalizeFilePath(req.file);
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
      updateData.icon = normalizeFilePath(req.file);
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
