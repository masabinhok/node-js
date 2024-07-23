const URL = require("../models/url");
const shortid = require("shortid"); // This package helps to create unique IDs

async function handleCreateShortUrl(req, res) {
  const { redirectURL } = req.body;
  if (!redirectURL) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid.generate();

  const newURL = new URL({
    shortId,
    redirectURL,
    visitHistory: [],
  });

  try {
    await newURL.save();
    return res.status(201).json({ shortId, redirectURL });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { handleCreateShortUrl };
