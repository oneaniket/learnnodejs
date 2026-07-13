// App.js — the top-level component. Owns the task state, loads tasks from the
// API on mount, and wires the form + list together. This is where all modules
// meet: state (M8), lists (M7), HTTP (M2), talking to the MVC/CRUD API (M4).

import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import * as api from "./api/tasksApi";

function App() {
  const [tasks, setTasks] = useState([]); // the list (state)
  const [error, setError] = useState("");

  // Load tasks once, right after the first render.
  useEffect(() => {
    loadTasks();
  }, []); // empty [] => run only once (on mount)

  async function loadTasks() {
    try {
      const data = await api.getTasks(); // GET /api/tasks
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  }

  // CREATE: called by TaskForm with the new title.
  async function handleAdd(title) {
    try {
      const created = await api.createTask(title); // POST -> returns new task
      setTasks((prev) => [created, ...prev]); // update state -> UI re-renders
    } catch (err) {
      setError(err.message);
    }
  }

  // UPDATE: flip completed and save.
  async function handleToggle(task) {
    try {
      const updated = await api.updateTask(task._id, {
        completed: !task.completed,
      });
      // Replace the changed task in state.
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  // DELETE: remove and update state.
  async function handleDelete(id) {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <p className="subtitle">{remaining} remaining</p>

      {error && <p className="error">Error: {error} (is the backend running?)</p>}

      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
