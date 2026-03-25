const mongoose = require("mongoose");

const analyticEventSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
    userAgent: { type: String, default: "" },
    ip: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    browser: { type: String, default: "" },
    os: { type: String, default: "" },
    ipHash: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnalyticEvent", analyticEventSchema);
