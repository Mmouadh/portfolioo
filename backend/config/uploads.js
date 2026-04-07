const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Where uploaded assets are stored locally (fallback when Cloudinary is not configured).
const uploadRoot = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadRoot, { recursive: true });

// Detect Cloudinary config
const hasCloudinaryEnv =
  !!process.env.CLOUDINARY_URL ||
  (process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET);

if (hasCloudinaryEnv) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Given a multer file object, return a public URL or relative path that the frontend can use.
 * - Cloudinary uploads already expose an https URL via `path` or `secure_url`.
 * - Local uploads are mapped to `/uploads/...` so Express static middleware can serve them.
 */
const normalizeFilePath = (file) => {
  if (!file) return null;

  const directUrl = file.path || file.secure_url || file.location;
  if (directUrl && /^https?:\/\//i.test(directUrl)) return directUrl;

  // Local disk storage
  const filename = file.filename || path.basename(directUrl || "");
  const destination = file.destination || path.dirname(file.path || "");

  const relativeDir = destination
    ? path.relative(uploadRoot, destination)
    : "";

  const segments = ["uploads"];
  if (relativeDir && relativeDir !== ".") segments.push(relativeDir);
  if (filename) segments.push(filename);

  return segments.join("/").replace(/\\/g, "/");
};

const createStorage = ({ folder = "uploads", resourceType = "image" } = {}) => {
  if (hasCloudinaryEnv) {
    return new CloudinaryStorage({
      cloudinary,
      params: {
        folder,
        resource_type: resourceType,
        public_id: () => `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      },
    });
  }

  const dir = path.join(uploadRoot, folder);
  fs.mkdirSync(dir, { recursive: true });

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dir),
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  });
};

const makeUpload = ({ folder = "uploads", resourceType = "image", limits, fileFilter } = {}) => {
  const storage = createStorage({ folder, resourceType });
  return multer({ storage, limits, fileFilter });
};

module.exports = {
  uploadRoot,
  makeUpload,
  normalizeFilePath,
  isCloudinaryEnabled: hasCloudinaryEnv,
};
