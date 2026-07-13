// app.js  —  builds and configures the Express application.
// We export the app WITHOUT starting it, so tests can import the app and the
// real server (server.js) can start it. This separation is a common pattern.

const express = require("express");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middleware: parse incoming JSON bodies into req.body.
app.use(express.json());

// A simple health-check route.
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CRUD + MVC Task API" });
});

// Mount the task routes at /api/tasks.
// Every path inside task.routes.js is now prefixed with /api/tasks.
app.use("/api/tasks", taskRoutes);

// Catch-all 404 for any unmatched route.
app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
});

module.exports = app;
