const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

// Create the server
const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  const log = `${new Date().toISOString()}:${req.method} ${
    req.url
  } New Req Received!\n`;
  const myUrl = url.parse(req.url);
  console.log(myUrl);

  // Append the log to the log.txt file
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Failed to write log", err);
    }
  });

  // Handle different routes
  switch (myUrl.pathname) {
    case "/":
      if (req.method == "GET") res.end("HomePage with a get method...");
      break;
    case "/about":
      const query = querystring.parse(myUrl.query);
      const username = query.myname || "Guest";
      res.end(`Hi ${username}, Welcome to the about page`);
      break;
    case "/search":
      const search = querystring.parse(myUrl.query);
      const searchTerm = search.q || "No search term provided";
      res.end(`You searched for ${searchTerm}`);
    case "/signup":
      if (req.method == "GET") res.end("your get request is received...");
      else if (req.method === "POST") {
        res.end("Your post request is received....");
      }
    default:
      res.end("404 Page");
  }
});

// Start the server
myServer.listen(8069, () => {
  console.log("Server is listening on port 8069");
});
