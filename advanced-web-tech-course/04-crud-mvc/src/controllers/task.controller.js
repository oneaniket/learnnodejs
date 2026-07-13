// task.controller.js  —  the "C" in MVC.
// The Controller holds the business logic. Each function:
//   1) reads what it needs from the request (req),
//   2) calls the Model to touch the database,
//   3) sends a response (res) with the right status code + JSON ("the View").
//
// The controller does NOT define URLs (that is the routes file) and does NOT
// define the data shape (that is the model). One job per layer.

const Task = require("../models/task.model");

// CREATE  —  POST /api/tasks
exports.create = async (req, res) => {
  try {
    // req.body holds the JSON the client sent.
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
    });
    // 201 Created: a new resource was made.
    res.status(201).json(task);
  } catch (err) {
    // A validation failure is the CLIENT's fault -> 400.
    res.status(400).json({ error: err.message });
  }
};

// READ ALL  —  GET /api/tasks
exports.findAll = async (req, res) => {
  try {
    // Optional filter: /api/tasks?completed=true
    const filter = {};
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === "true";
    }
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message }); // unexpected -> server error
  }
};

// READ ONE  —  GET /api/tasks/:id
exports.findOne = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      // The id was valid-looking but no such document exists.
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    // A malformed id (not a valid ObjectId) is the client's fault.
    res.status(400).json({ error: "Invalid task id" });
  }
};

// UPDATE  —  PUT /api/tasks/:id
exports.update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body, // fields to change
      {
        new: true, // return the UPDATED document, not the old one
        runValidators: true, // re-check schema rules on update
      }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE  —  DELETE /api/tasks/:id
exports.remove = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    // 200 with a small confirmation body (204 No Content is also valid).
    res.status(200).json({ message: "Task deleted", id: task._id });
  } catch (err) {
    res.status(400).json({ error: "Invalid task id" });
  }
};
