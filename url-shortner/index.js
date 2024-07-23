const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const PORT = 3000;

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON
app.use(express.json());

// Handle /url route
app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: new Date(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});



// Hosting the static files on the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
