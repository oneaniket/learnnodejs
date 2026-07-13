// express-server.js
// Setup: cd 02-http-express && npm install
// Run:   node code/express-server.js
//
// Goal: one route per important HTTP status code, plus a route that sets
// custom response headers. Hit each with `curl -i` to SEE the code + headers.

const express = require("express");
const app = express();

// Middleware: parse JSON request bodies into req.body (used by POST routes).
app.use(express.json());

// A tiny fake "database" so we can demonstrate 404 vs 200 realistically.
const users = [{ id: 1, name: "Ada" }];

// -------------------- 2xx SUCCESS --------------------

// 200 OK — the standard "here is your data" response.
app.get("/success", (req, res) => {
  res.status(200).json({ status: 200, message: "OK — request succeeded" });
});

// 201 Created — use this after successfully CREATING a resource.
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name || "Anonymous" };
  users.push(newUser);
  res.status(201).json({ status: 201, message: "Created", user: newUser });
});

// 204 No Content — success, but there is nothing to send back (empty body).
app.get("/no-content", (req, res) => {
  res.status(204).end(); // .end() with no body; 204 must not have a body
});

// -------------------- 4xx CLIENT ERRORS --------------------

// 400 Bad Request — the client sent something invalid.
app.get("/bad-request", (req, res) => {
  res.status(400).json({ status: 400, error: "Bad Request — invalid input" });
});

// 401 Unauthorized — the client is not authenticated (no/invalid credentials).
app.get("/unauthorized", (req, res) => {
  res
    .status(401)
    .json({ status: 401, error: "Unauthorized — please log in" });
});

// 404 Not Found — the requested resource does not exist.
app.get("/not-found", (req, res) => {
  res.status(404).json({ status: 404, error: "Not Found" });
});

// A realistic 200-vs-404 example using the fake DB and a URL parameter.
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    // Client's fault -> 400.
    return res.status(400).json({ status: 400, error: "id must be a number" });
  }
  const user = users.find((u) => u.id === id);
  if (!user) {
    // Does not exist -> 404.
    return res.status(404).json({ status: 404, error: "user not found" });
  }
  res.status(200).json({ status: 200, user });
});

// -------------------- 5xx SERVER ERRORS --------------------

// 500 Internal Server Error — something broke on the SERVER side.
app.get("/server-error", (req, res) => {
  res
    .status(500)
    .json({ status: 500, error: "Internal Server Error — our fault" });
});

// -------------------- CUSTOM RESPONSE HEADERS --------------------

// Demonstrates setting response headers with res.set().
app.get("/headers-demo", (req, res) => {
  // Set a single header.
  res.set("X-Powered-By", "AdvancedWebCourse");
  // Set several headers at once with an object.
  res.set({
    "Cache-Control": "no-store",
    "X-Request-Id": "demo-" + Date.now(),
    "Content-Language": "en",
  });
  res.status(200).json({
    status: 200,
    message: "Check the response headers with `curl -i`",
  });
});

// -------------------- CATCH-ALL 404 --------------------
// If no route above matched, respond 404. (Must be defined LAST.)
app.use((req, res) => {
  res.status(404).json({ status: 404, error: `No route for ${req.originalUrl}` });
});

// Start the server.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
  console.log("Try these:");
  console.log("  curl -i http://localhost:3000/success");
  console.log("  curl -i -X POST -H 'Content-Type: application/json' \\");
  console.log("       -d '{\"name\":\"Grace\"}' http://localhost:3000/users");
  console.log("  curl -i http://localhost:3000/headers-demo");
});
