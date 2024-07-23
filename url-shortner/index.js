const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const app = express();
const PORT = 8001;
const path = require("path");

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Handle /url route
app.use("/url", urlRoute);

// Handle static routes
app.use("/", staticRoute);

// Route for shortid redirect
app.get("/:shortid", async (req, res) => {
  try {
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: new Date() },
        },
      }
    );
    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    res.status(404).send("Not Found");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
