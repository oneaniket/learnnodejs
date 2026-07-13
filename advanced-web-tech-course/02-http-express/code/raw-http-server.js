// raw-http-server.js
// Run:  node raw-http-server.js
// Test: curl -i http://localhost:3000/
//
// Goal: show HTTP status codes and headers using ONLY Node's built-in `http`
// module — no framework. This is what Express does for you under the hood.

// `http` is a core Node module, so no `npm install` is needed.
const http = require("http");

// createServer takes a function that runs for EVERY incoming request.
// `req` = the request, `res` = the response we build and send back.
const server = http.createServer((req, res) => {
  // Route by URL path. req.url is the path, e.g. "/" or "/teapot".
  if (req.url === "/") {
    // res.writeHead(statusCode, headersObject) sets the status line + headers.
    res.writeHead(200, {
      "Content-Type": "application/json",
      "X-Powered-By": "raw-node-http",
    });
    // res.end(body) sends the body and finishes the response.
    res.end(JSON.stringify({ message: "Hello from the raw http module" }));
  } else if (req.url === "/teapot") {
    // A fun status code (418) to prove we control the number and text.
    res.writeHead(418, { "Content-Type": "text/plain" });
    res.end("I'm a teapot");
  } else {
    // Anything else -> 404 Not Found.
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start listening on port 3000.
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Raw HTTP server running at http://localhost:${PORT}`);
  console.log("Try:  curl -i http://localhost:3000/");
  console.log("Try:  curl -i http://localhost:3000/teapot");
});
