const mongoose = require("mongoose");

const aboutMeSchema = new mongoose.Schema({
  name: { type: String, default: "Your Name" },
  title: { type: String, default: "Your Title" },
  bio: { type: String, default: "Your bio here." },
  image: { type: String, default: "" }, // profile photo URL

  subheading: { type: String, default: "01 // System_Overview" },
  heading1: { type: String, default: "BRIDGING CODE" },
  heading2: { type: String, default: "& IT & DEV" },
  location: { type: String, default: "Tunisia" },

  status: { type: String, default: "Status: Active Developer & IT Support // 2026" },
  specs: {
    type: [{
      label: { type: String },
      value: { type: String }
    }],
    default: [
      { label: 'Stack', value: 'MERN (MongoDB, Express, React, Node.js)' },
      { label: 'Frontend & UI', value: 'React, Tailwind CSS, Styled-components, HTML, CSS, Animations' },
      { label: 'IT & Environment', value: 'Windows & Linux basics, Git, Github, Deployment (Render, Vercel)' },
      { label: 'Support Tools', value: 'GLPI, Sage, IT Support & Troubleshooting' },
    ]
  },

  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AboutMe", aboutMeSchema);