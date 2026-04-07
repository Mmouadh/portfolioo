const AboutMe = require("../models/AboutMe");
const { normalizeFilePath } = require("../config/uploads");

// GET about me
exports.getAboutMe = async (req, res) => {
  try {
    let about = await AboutMe.findOne(); // we only need one
    if (!about) {
      about = new AboutMe(); // Create a new instance with default values
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE about me
exports.updateAboutMe = async (req, res) => {
  console.log("updateAboutMe called. req.body:", req.body);
  try {
    const { name, title, bio, subheading, heading1, heading2, location, status, specs } = req.body;
    let about = await AboutMe.findOne();

    // If no record exists, create one
    if (!about) {
      about = new AboutMe({});
    }
    
    // Update fields if they are provided in the request
    about.name = name ?? about.name;
    about.title = title ?? about.title;
    about.bio = bio ?? about.bio;
    about.subheading = subheading ?? about.subheading;
    about.heading1 = heading1 ?? about.heading1;
    about.heading2 = heading2 ?? about.heading2;
    about.location = location ?? about.location;
    about.status = status ?? about.status;
    
    // Specs will be sent as a JSON string
    if (specs) {
      try {
        about.specs = JSON.parse(specs);
      } catch (e) {
        return res.status(400).json({ message: "Invalid specs JSON format" });
      }
    }

    // Handle file upload if present
    const uploadedImage = normalizeFilePath(req.file);
    if (uploadedImage) {
      about.image = uploadedImage;
    }

    about.updatedAt = Date.now();
    await about.save();

    res.json(about);
  } catch (error) {
    console.error("Error in updateAboutMe:", error);
    res.status(500).json({ message: error.message });
  }
};
