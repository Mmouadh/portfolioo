const express = require("express");
const router = express.Router();
const { makeUpload } = require("../config/uploads");
const upload = makeUpload({ folder: "about", resourceType: "image" });
const { getAboutMe, updateAboutMe } = require("../controllers/aboutMeController");
const authMiddleware = require("../middleware/auth");

// GET is public
router.get("/", getAboutMe);

// Update about → protected
router.put("/", authMiddleware, upload.single("image"), updateAboutMe);

module.exports = router;
