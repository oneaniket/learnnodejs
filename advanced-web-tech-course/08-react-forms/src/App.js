// App.js — owns the LIST of users (state) and receives new ones from the form.
// This demonstrates "lifting state up": the form is a child, but the shared
// data (the list) lives in the parent.

import { useState } from "react";
import UserForm from "./components/UserForm";

function App() {
  // The list of users is state, so adding one re-renders the screen.
  const [users, setUsers] = useState([
    { id: 1, name: "Grace Hopper", email: "grace@example.com" },
  ]);

  // Called by UserForm (via the onAddUser prop) when a valid user is submitted.
  function handleAddUser(newUser) {
    setUsers((prev) => [
      ...prev, // keep existing users
      { id: Date.now(), ...newUser }, // add the new one with a simple unique id
    ]);
  }

  return (
    <div className="app">
      <h1>Add a User</h1>

      {/* Pass the callback DOWN as a prop. Data down, events up. */}
      <UserForm onAddUser={handleAddUser} />

      <h2>Users ({users.length})</h2>
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
