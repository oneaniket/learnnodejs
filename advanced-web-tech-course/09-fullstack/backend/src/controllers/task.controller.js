// task.controller.js — the Controller (C in MVC). Business logic for each CRUD
// operation. Reads the request, calls the model, sends JSON + a status code.

const Task = require("../models/task.model");

// GET /api/tasks — list all tasks, newest first.
exports.findAll = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tasks — create a task.
exports.create = async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task); // 201 Created
  } catch (err) {
    res.status(400).json({ error: err.message }); // validation -> client error
  }
};

// PUT /api/tasks/:id — update a task (used to toggle `completed`).
exports.update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/tasks/:id — remove a task.
exports.remove = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "deleted", id: task._id });
  } catch (err) {
    res.status(400).json({ error: "Invalid task id" });
  }
};
