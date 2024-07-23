const express = require("express");
const { handleCreateShortUrl } = require("../controllers/url");

const router = express.Router();

router.post("/", handleCreateShortUrl);

module.exports = router;
