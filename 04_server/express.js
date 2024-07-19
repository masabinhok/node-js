//requiring modules
const express = require("express");

// Create the express app
const app = express();

//handling requests on certain paths...
app.get("/", (req, res) => {
  res.send("Hello I am root directory of this express app");
});

app.get("/about", (req, res) => {
  res.send(
    `Hello from the about page Mr. ${
      req.query.name ? req.query.name : "Guest"
    }! Are you really ${req.query.age ? req.query.age : "x"} years old?`
  );
});

//starting the server
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
