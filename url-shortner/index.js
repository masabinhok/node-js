const express = require("express");
const { connectToMongoDB } = require("./connect");

const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

const URL = require("./models/url");
const app = express();
const PORT = 8001;
const path = require("path");

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() => {
  console.log("Connected to MongoDB");
});

//routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Handle /url route
app.use("/url", restrictToLoggedinUserOnly, urlRoute);

// Handle static routes
app.use("/", checkAuth, staticRoute);

//Handle user routes
app.use("/user", userRoute);

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
