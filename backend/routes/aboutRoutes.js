const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { getAboutMe, updateAboutMe } = require("../controllers/aboutMeController");
const authMiddleware = require("../middleware/auth");

// GET is public
router.get("/", getAboutMe);

// Update about → protected
router.put("/", authMiddleware, upload.single("image"), updateAboutMe);

module.exports = router;