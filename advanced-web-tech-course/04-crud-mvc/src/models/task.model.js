// task.model.js  —  the "M" in MVC.
// The Model knows ONLY about the data and its rules. It has no idea that HTTP
// or Express exist. Its single job is to define what a Task looks like and to
// talk to MongoDB.

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"], // custom validation message
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false, // a new task is not done yet
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // only these values allowed
      default: "medium",
    },
  },
  {
    // `timestamps: true` auto-adds createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Export the Model. "Task" -> the "tasks" collection in MongoDB.
module.exports = mongoose.model("Task", taskSchema);
