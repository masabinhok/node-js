const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteEntry,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.delete("/:shortId", handleDeleteEntry);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
