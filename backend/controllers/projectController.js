const path = require("path");
const Project = require("../models/project");

const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

exports.createProject = async (req, res) => {
  try {
    const imagePath = req.file
      ? path.join("uploads", "projects", req.file.filename).replace(/\\/g, "/")
      : req.body.image;

    const payload = {
      title: req.body.title,
      description: req.body.description,
      technologies: parseList(req.body.technologies),
      tags: parseList(req.body.tags),
      githubLink: req.body.githubLink,
      liveDemo: req.body.liveDemo,
      link: req.body.link || req.body.liveDemo || req.body.githubLink,
      image: imagePath,
    };

    const project = await Project.create(payload);
    res.status(201).json(project);
  } catch (error) {
    console.error("createProject failed", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const update = { ...req.body };

    if (req.body.technologies !== undefined) {
      update.technologies = parseList(req.body.technologies);
    }

    if (req.body.tags !== undefined) {
      update.tags = parseList(req.body.tags);
    }

    if (req.file) {
      update.image = path.join("uploads", "projects", req.file.filename).replace(/\\/g, "/");
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error("updateProject failed", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
