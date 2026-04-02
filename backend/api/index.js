// Entry point for Vercel Serverless Function
const serverless = require("serverless-http");
const { app, connectDB } = require("../server");

// Ensure the DB is connected before handling the request
module.exports = async (req, res) => {
  await connectDB();
  const handler = serverless(app);
  return handler(req, res);
};
