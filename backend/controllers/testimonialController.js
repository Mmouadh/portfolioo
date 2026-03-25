const Testimonial = require("../models/testimonial");

exports.createTestimonial = async (req, res) => {
  try {
    const { name, age, city, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ message: "Name and message are required" });
    }
    const testimonial = await Testimonial.create({
      name,
      age,
      city,
      message,
      status: "pending",
    });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit testimonial" });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 3));
    const skip = (page - 1) * limit;

    const query = { status: "approved" };

    const [items, total] = await Promise.all([
      Testimonial.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Testimonial.countDocuments(query),
    ]);

    res.json({ items, total, page, hasMore: skip + items.length < total });
  } catch (err) {
    res.status(500).json({ message: "Failed to load testimonials" });
  }
};

exports.listAll = async (req, res) => {
  try {
    const status = req.query.status;
    const query = status ? { status } : {};
    const items = await Testimonial.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to load testimonials" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "denied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update testimonial" });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
};
