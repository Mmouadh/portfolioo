const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { makeUpload } = require("../config/uploads");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const upload = makeUpload({
  folder: "projects",
  resourceType: "image",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

// This route should be public to display projects
router.get("/", getProjects);

// These routes modify data and should be protected
router.post("/", authMiddleware, upload.single("image"), createProject);

router.put("/:id", authMiddleware, upload.single("image"), updateProject);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
