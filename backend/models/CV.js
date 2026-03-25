const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  filename: { type: String, required: true }, // original filename
  path: { type: String, required: true },     // path on server
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CV", cvSchema);