// task.model.js — the Model (M in MVC). Defines the Task shape + rules.
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"], trim: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true } // auto createdAt / updatedAt
);

module.exports = mongoose.model("Task", taskSchema);
