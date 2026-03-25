const crypto = require("crypto");
let geoip;
try {
  geoip = require("geoip-lite");
} catch (err) {
  geoip = null;
}
let UAParser;
try {
  UAParser = require("ua-parser-js");
} catch (err) {
  UAParser = null;
}

const AnalyticEvent = require("../models/analyticEvent");

exports.logEvent = async (req, res) => {
  try {
    const { path } = req.body;
    if (!path) return res.status(400).json({ message: "Path is required" });

    const forwarded = req.headers["x-forwarded-for"];
    const rawIp = Array.isArray(forwarded)
      ? forwarded[0]
      : typeof forwarded === "string"
      ? forwarded.split(",")[0]
      : req.ip || "";
    const ip = (rawIp || "").trim();

    let country = "";
    let city = "";
    let browser = "";
    let os = "";

    if (UAParser) {
      const parsed = UAParser(req.get("user-agent") || "");
      browser = parsed.browser?.name || "";
      os = parsed.os?.name || "";
    }

    if (geoip && ip && !ip.startsWith("127.") && ip !== "::1") {
      const lookup = geoip.lookup(ip);
      if (lookup) {
        country = lookup.country || "";
        city = lookup.city || lookup.region || lookup.country || "";
      }
    }
    if (!country) country = ip && (ip.startsWith("127.") || ip === "::1") ? "LOCAL" : "UNKNOWN";
    if (!city) city = country === "LOCAL" ? "Localhost" : "Unknown";

    const ipHash =
      ip && !ip.startsWith("127.") && ip !== "::1"
        ? crypto.createHash("sha256").update(ip).digest("hex")
        : "";

    await AnalyticEvent.create({
      path,
      userAgent: req.get("user-agent") || "",
      ip,
      country,
      city,
      browser,
      os,
      ipHash,
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to log event" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const days = Math.max(1, Math.min(90, parseInt(req.query.days, 10) || 30));
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const match = { createdAt: { $gte: since } };

    const total = await AnalyticEvent.countDocuments(match);

    const perDay = await AnalyticEvent.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            y: { $year: "$createdAt" },
            m: { $month: "$createdAt" },
            d: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.y": 1, "_id.m": 1, "_id.d": 1 } },
    ]);

    const topPaths = await AnalyticEvent.aggregate([
      { $match: match },
      { $group: { _id: "$path", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    const perMonth = await AnalyticEvent.aggregate([
      { $match: match },
      {
        $group: {
          _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.y": 1, "_id.m": 1 } },
    ]);

    const perYear = await AnalyticEvent.aggregate([
      { $match: match },
      { $group: { _id: { y: { $year: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { "_id.y": 1 } },
    ]);

    const topBrowsers = await AnalyticEvent.aggregate([
      { $match: { ...match, browser: { $ne: "" } } },
      { $group: { _id: "$browser", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const topUsers = await AnalyticEvent.aggregate([
      { $match: { ...match, ipHash: { $ne: "" } } },
      { $group: { _id: "$ipHash", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const topIps = await AnalyticEvent.aggregate([
      { $match: { ...match, ip: { $ne: "" } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$ip",
          count: { $sum: 1 },
          lastVisit: { $first: "$createdAt" },
          country: { $first: "$country" },
          city: { $first: "$city" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      total,
      perDay: perDay.map((p) => ({
        date: `${p._id.y}-${String(p._id.m).padStart(2, "0")}-${String(
          p._id.d
        ).padStart(2, "0")}`,
        count: p.count,
      })),
      topPaths: topPaths.map((p) => ({ path: p._id, count: p.count })),
      perMonth: perMonth.map((p) => ({
        month: `${p._id.y}-${String(p._id.m).padStart(2, "0")}`,
        count: p.count,
      })),
      perYear: perYear.map((p) => ({ year: p._id.y, count: p.count })),
      topBrowsers: topBrowsers.map((b) => ({ browser: b._id, count: b.count })),
      topUsers: topUsers.map((u, idx) => ({
        label: `User #${idx + 1}`,
        count: u.count,
      })),
      topIps: topIps.map((ip) => ({
        ip: ip._id,
        count: ip.count,
        lastVisit: ip.lastVisit,
        country: ip.country,
        city: ip.city,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load analytics" });
  }
};
