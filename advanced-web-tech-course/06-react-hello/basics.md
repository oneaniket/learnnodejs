# React.js Beginner to Intermediate Learning

This repository contains my React.js learning journey from beginner to intermediate level.

The goal is to understand React fundamentals through simple examples, exercises, and small projects rather than only learning syntax.

## Learning Roadmap

Topics covered:

1. React fundamentals
2. Components
3. JSX
4. Props
5. State
6. Events
7. Conditional rendering
8. Lists and keys
9. Forms
10. `useEffect`
11. API calls
12. Component lifecycle concepts
13. Lifting state up
14. Context API
15. Custom hooks
16. React Router
17. Loading and error handling
18. Reusable components
19. Performance basics
20. Small React projects

## React Mental Model

React applications are built using components.

```text
App
├── Navbar
├── Sidebar
├── ProductList
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
└── Footer
```

The basic React flow is:

```text
Data
 ↓
Component
 ↓
JSX
 ↓
UI
```

When state changes:

```text
State changes
     ↓
Component re-renders
     ↓
New JSX is generated
     ↓
React updates the UI
```

## Basic Component

```jsx
function Welcome() {
  return <h1>Hello React</h1>;
}

function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}

export default App;
```

React component names should start with a capital letter.

## JSX

JSX allows us to write HTML-like syntax inside JavaScript.

```jsx
function App() {
  const name = "Rahul";

  return <h1>Hello {name}</h1>;
}
```

JavaScript expressions are written inside `{}`.

```jsx
function App() {
  const price = 100;
  const quantity = 3;

  return <h1>Total: {price * quantity}</h1>;
}
```

## Props

Props are used to send data from a parent component to a child component.

```jsx
function UserCard({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}
```

Usage:

```jsx
function App() {
  return (
    <>
      <UserCard name="Rahul" age={30} />
      <UserCard name="John" age={25} />
    </>
  );
}
```

Data flow:

```text
Parent
  ↓ props
Child
```

Props should be treated as read-only.

## State

State represents data owned by a component that can change.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <h1>{count}</h1>;
}
```

`count` contains the current value.

`setCount` updates the value.

```jsx
setCount(count + 1);
```

State should not be updated directly.

Avoid:

```jsx
count = count + 1;
```

Use:

```jsx
setCount(count + 1);
```

## Events

React events allow us to respond to user actions.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={increment}>
        Increase
      </button>
    </div>
  );
}
```

Flow:

```text
User clicks button
      ↓
onClick
      ↓
Function executes
      ↓
State changes
      ↓
React re-renders
      ↓
UI updates
```

## Conditional Rendering

React can display different UI depending on a condition.

```jsx
function UserStatus() {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome</h1>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
}
```

Another common pattern is:

```jsx
{isAdmin && <button>Delete User</button>}
```

## Rendering Lists

Use `.map()` to render arrays.

```jsx
function App() {
  const users = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "John" },
    { id: 3, name: "Alice" }
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

Use a stable unique value for `key` whenever possible.

```jsx
key={user.id}
```

## Exercises

### Exercise 1 — Product Component

Create a `Product` component using:

```jsx
const name = "MacBook Pro";
const price = 120000;
const inStock = true;
```

Display:

```text
MacBook Pro
Price: 120000
In Stock
```

If `inStock` is `false`, display:

```text
Out of Stock
```

### Exercise 2 — UserCard Component

Create:

```jsx
function UserCard({ name, age }) {
  // implementation
}
```

Use:

```jsx
<UserCard name="Rahul" age={30} />
<UserCard name="John" age={25} />
```

### Exercise 3 — Counter

Create a counter with:

```text
Count: 0

Increase
Decrease
Reset
```

Use React's `useState`.

Expected behavior:

```text
Increase → count + 1
Decrease → count - 1
Reset    → 0
```

## Recommended Project Structure

```text
src/
├── components/
│   ├── Counter.jsx
│   ├── Product.jsx
│   └── UserCard.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

As the application becomes larger, the structure can evolve into:

```text
src/
├── components/
├── pages/
├── hooks/
├── context/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

## Running a React Project

A modern React application can be created using Vite.

```bash
npm create vite@latest react-learning
```

Select:

```text
React
JavaScript
```

Then:

```bash
cd react-learning
npm install
npm run dev
```

For React with TypeScript, select:

```text
React
TypeScript
```

## Next Topics

After completing the basics, continue with:

```text
Forms
   ↓
Controlled Inputs
   ↓
useEffect
   ↓
API Calls
   ↓
Loading / Error States
   ↓
React Router
   ↓
Context API
   ↓
Custom Hooks
   ↓
Reusable Components
```

The final goal is to be comfortable building a small real-world React application using components, props, state, hooks, routing, and APIs.
