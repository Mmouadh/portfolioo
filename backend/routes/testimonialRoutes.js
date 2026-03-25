const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createTestimonial,
  getTestimonials,
  listAll,
  updateStatus,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// Public: fetch approved testimonials (paginated)
router.get("/", getTestimonials);

// Public: submit new testimonial (goes to pending)
router.post("/", createTestimonial);

// Admin: list all, change status, delete
router.get("/all", authMiddleware, listAll);
router.patch("/:id/status", authMiddleware, updateStatus);
router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;
