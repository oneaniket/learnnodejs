// App.js — owns the LIST of users (state) and receives new ones from the form.
// This demonstrates "lifting state up": the form is a child, but the shared
// data (the list) lives in the parent.

import { useState } from "react";
import Button from "./components/Button";
import Counter from "./components/Counter";
import MenuBar from "./components/MenuBar";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";

const navLinks = [
  { label: "Components", href: "#components" },
  { label: "Form", href: "#form" },
];

const menuItems = ["Home", "Courses", "About", "Contact"];

function App() {
  // The list of users is state, so adding one re-renders the screen.
  const [users, setUsers] = useState([
    { id: 1, name: "Grace Hopper", email: "grace@example.com" },
  ]);
  const [message, setMessage] = useState("Click a button to see an event.");

  // Called by UserForm (via the onAddUser prop) when a valid user is submitted.
  function handleAddUser(newUser) {
    setUsers((prev) => [
      ...prev, // keep existing users
      { id: Date.now(), ...newUser }, // add the new one with a simple unique id
    ]);
  }

  return (
    <div id="top">
      <Navbar brand="React Basics" links={navLinks} />

      <main className="app">
        <header className="page-header">
          <p className="eyebrow">Beginner examples</p>
          <h1>Basic React Components</h1>
          <p>
            These examples show how components use props, state, events, and
            lists to create a user interface.
          </p>
        </header>

        <section id="components" className="example-section">
          <h2>Menu Bar</h2>
          <p className="example-note">
            The menu is created from an array and uses state to track the active
            item.
          </p>
          <MenuBar items={menuItems} />
        </section>

        <section className="example-section">
          <h2>Reusable Buttons</h2>
          <p className="example-note">
            One Button component displays different text and styles through
            props.
          </p>
          <div className="button-row">
            <Button onClick={() => setMessage("Primary button clicked!")}>
              Primary Button
            </Button>
            <Button
              variant="secondary"
              onClick={() => setMessage("Secondary button clicked!")}
            >
              Secondary Button
            </Button>
          </div>
          <p className="selection-message" aria-live="polite">
            {message}
          </p>
        </section>

        <section className="example-section">
          <h2>Counter</h2>
          <p className="example-note">
            This component owns a number in state and updates it on a click.
          </p>
          <Counter />
        </section>

        <section id="form" className="example-section">
          <h2>Add a User</h2>
          <p className="example-note">
            The form uses controlled inputs and sends valid data to App.
          </p>

          {/* Pass the callback DOWN as a prop. Data down, events up. */}
          <UserForm onAddUser={handleAddUser} />

          <h3>Users ({users.length})</h3>
          <ul className="user-list">
            {users.map((u) => (
              <li key={u.id}>
                <strong>{u.name}</strong> — {u.email}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
