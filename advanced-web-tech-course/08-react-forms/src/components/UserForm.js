import { useState } from "react";
import Button from "./Button";

// App sends onAddUser to this component as a prop.
function UserForm({ onAddUser }) {
  // React state stores the current value of both inputs.
  const [form, setForm] = useState({ name: "", email: "" });
  // This state stores an error message, if validation fails.
  const [error, setError] = useState("");

  // Both inputs use this one handler.
  // The input name tells us which property to change.
  function handleInputChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setForm((previousForm) => ({
      ...previousForm,
      [inputName]: inputValue,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // keep React from doing a full-page reload

    // Check the values currently stored in state.
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Email must contain @");
      return;
    }

    // Send the valid user up to App through the callback prop.
    onAddUser({ ...form });

    // Clear the inputs after a successful submission.
    setForm({ name: "", email: "" });
    setError("");
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Ada Lovelace"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="ada@example.com"
          type="email"
          required
        />
      </div>

      {/* Render an error paragraph only when error contains text. */}
      {error && <p className="error" role="alert">{error}</p>}

      <Button type="submit">Add User</Button>
    </form>
  );
}

export default UserForm;
