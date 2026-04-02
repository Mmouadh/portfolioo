const fs = require("fs");
const path = require("path");

// Where uploaded assets are stored. Defaults to the local ./uploads folder
// but can be overridden (e.g. to /tmp/uploads on Vercel).
const uploadRoot = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");

// Ensure the directory exists before Multer tries to write into it.
fs.mkdirSync(uploadRoot, { recursive: true });

module.exports = { uploadRoot };
