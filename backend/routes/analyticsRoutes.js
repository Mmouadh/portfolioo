const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { logEvent, getSummary } = require("../controllers/analyticsController");

// Public logging endpoint
router.post("/", logEvent);

// Admin summary
router.get("/summary", authMiddleware, getSummary);

module.exports = router;
