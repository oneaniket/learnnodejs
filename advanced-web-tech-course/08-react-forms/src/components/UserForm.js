// UserForm.js — a controlled form built with STATE, that reports results to
// its parent via a PROP callback (onAddUser).

import { useState } from "react";

// `onAddUser` is a function passed in as a prop by the parent (App).
function UserForm({ onAddUser }) {
  // One state object holds every field's value.
  const [form, setForm] = useState({ name: "", email: "" });
  // Separate state for a validation error message.
  const [error, setError] = useState("");

  // One handler for ALL inputs. It uses the input's `name` attribute to know
  // which field to update.
  function handleChange(e) {
    const { name, value } = e.target;
    // Copy the previous state, then overwrite just the changed field.
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page

    // Validation: read straight from state.
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Email must contain @");
      return;
    }

    // Valid -> send the data UP to the parent via the callback prop.
    onAddUser({ ...form });

    // Reset the form and clear any error.
    setForm({ name: "", email: "" });
    setError("");
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name" // must match the key in `form`
          value={form.name} // value comes FROM state (controlled input)
          onChange={handleChange} // typing updates state
          placeholder="Ada Lovelace"
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="ada@example.com"
        />
      </div>

      {/* Show the error only when there is one. */}
      {error && <p className="error">{error}</p>}

      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
