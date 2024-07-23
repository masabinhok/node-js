const express = require("express");
const { connectToMongoDb } = require("./connect");
const urlRoute = require("./routes/url");

// Creating an Express app
const app = express();

// Defining PORT
const PORT = 3000;

// Connect to MongoDB
connectToMongoDb("mongodb://localhost:27017/url-shortener");

// Middleware to parse JSON
app.use(express.json());

// Handle /url route
app.use("/url", urlRoute);

// Hosting the static files on the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
