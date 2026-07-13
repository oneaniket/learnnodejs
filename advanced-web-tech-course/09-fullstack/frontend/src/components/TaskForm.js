// TaskForm.js — controlled form to add a task (props + state, Module 8).
// On submit it calls the onAdd callback passed down from App.

import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // no page reload
    const trimmed = title.trim();
    if (!trimmed) return; // ignore empty submits
    onAdd(trimmed); // send the title UP to the parent
    setTitle(""); // reset the input
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title} // controlled input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
      />
      <button type="submit" disabled={!title.trim()}>
        Add
      </button>
    </form>
  );
}

export default TaskForm;
