const shortid = require("shortid");

const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "URL is required" });

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).render("home", {
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.status(201).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleDeleteEntry(req, res) {
  const shortId = req.params.shortId;
  if (!shortId)
    return res.status(400).json({ message: "Short ID is required" });
  await URL.deleteOne({ shortId });
  return res.json({ message: "Deleted" });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteEntry,
};
