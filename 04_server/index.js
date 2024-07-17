const http = require("http");
const fs = require("fs");

// Create the server
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received!\n`;
  
  // Append the log to the log.txt file
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Failed to write log", err);
    }
  });

  // Handle different routes
  switch (req.url) {
    case "/":
      res.end("HomePage");
      break;
    case "/about":
      res.end("About Page");
      break;
    default:
      res.end("404 Page");
  }
});

// Start the server
myServer.listen(8069, () => {
  console.log("Server is listening on port 8069");
});
