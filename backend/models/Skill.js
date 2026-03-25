const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, default: "intermediate" }, // optional: beginner / intermediate / advanced
  icon: { type: String } // optional: icon or image URL
});

module.exports = mongoose.model("Skill", skillSchema);