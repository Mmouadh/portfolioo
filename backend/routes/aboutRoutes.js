const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadRoot } = require("../config/uploads");
const upload = multer({ dest: uploadRoot });
const { getAboutMe, updateAboutMe } = require("../controllers/aboutMeController");
const authMiddleware = require("../middleware/auth");

// GET is public
router.get("/", getAboutMe);

// Update about → protected
router.put("/", authMiddleware, upload.single("image"), updateAboutMe);

module.exports = router;
