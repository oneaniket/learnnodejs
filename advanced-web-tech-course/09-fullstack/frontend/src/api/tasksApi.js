// tasksApi.js — the frontend's DATA LAYER.
// All communication with the backend lives here, so components stay clean and
// only deal with UI. Each function uses fetch() to call the Express API.

// Base URL of the backend API (Module 2/4 server, started separately).
const BASE_URL = "http://localhost:4000/api/tasks";

// READ: GET all tasks.
export async function getTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

// CREATE: POST a new task.
export async function createTask(title) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

// UPDATE: PUT to toggle completion (or change any field).
export async function updateTask(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

// DELETE: remove a task by id.
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}
