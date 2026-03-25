const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");

async function createAdmin() {

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    email: "admin@example.com",
    password: hashedPassword
  });

  await admin.save();

  console.log("Admin created");

  process.exit();
}

createAdmin();