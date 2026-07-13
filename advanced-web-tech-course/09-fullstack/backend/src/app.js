// app.js — builds the Express app. Enables CORS so the React frontend
// (a different origin) can call this API.

const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");

const app = express();

// CORS: allow the React dev server (http://localhost:3000) to call this API.
// With no options, cors() allows all origins — fine for local development.
app.use(cors());

// Parse JSON request bodies.
app.use(express.json());

// Health check.
app.get("/", (req, res) => res.json({ status: "ok", api: "task-manager" }));

// Mount the task routes.
app.use("/api/tasks", taskRoutes);

module.exports = app;
