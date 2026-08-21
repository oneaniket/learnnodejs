# React: Displaying Data Lists & CSS

This module introduces one of the most common patterns in React:

* storing data in arrays,
* displaying that data using `.map()`,
* passing data between components with props,
* and styling the result using CSS.

The goal is to build a small React application that displays multiple user cards on screen.

---

## 1. Basic idea

Suppose we have this data:

```jsx
const users = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@example.com",
    active: true,
  },
  {
    id: 2,
    name: "John",
    email: "john@example.com",
    active: false,
  },
];
```

We want React to display:

```text
Rahul
rahul@example.com
Active

John
john@example.com
Inactive
```

Instead of manually writing every user, we can use `.map()`.

---

# 2. What is `.map()`?

`.map()` is a JavaScript array method.

It takes every item in an array and creates something new from it.

Basic JavaScript example:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => {
  return number * 2;
});

console.log(doubled);
```

Output:

```text
[2, 4, 6]
```

The flow is:

```text
[1, 2, 3]
    ↓
  .map()
    ↓
[2, 4, 6]
```

In React, instead of creating numbers, we usually create JSX.

---

# 3. Rendering a list in React

Example:

```jsx
const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>
          {fruit}
        </li>
      ))}
    </ul>
  );
}
```

React creates:

```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>
```

The important part is:

```jsx
fruits.map((fruit) => (
  <li key={fruit}>{fruit}</li>
))
```

You can think of it as:

```text
Apple
 ↓
<li>Apple</li>

Banana
 ↓
<li>Banana</li>

Cherry
 ↓
<li>Cherry</li>
```

---

# 4. Why do we use `{}`?

Inside JSX, JavaScript expressions are written inside curly braces.

Example:

```jsx
const name = "Rahul";

return <h1>{name}</h1>;
```

Therefore:

```jsx
{fruits.map(...)}
```

means:

> Run this JavaScript expression inside JSX.

---

# 5. The `key` prop

Every item created using `.map()` should have a unique `key`.

Example:

```jsx
users.map((user) => (
  <div key={user.id}>
    {user.name}
  </div>
))
```

The `key` helps React identify each item.

For example:

```jsx
const users = [
  { id: 101, name: "Rahul" },
  { id: 102, name: "John" },
];
```

Use:

```jsx
key={user.id}
```

Prefer a stable ID.

Good:

```jsx
key={user.id}
```

Less ideal:

```jsx
key={index}
```

Array indexes can cause problems when items are inserted, deleted, or reordered.

---

# 6. What are props?

Props are how one component sends data to another component.

Think of props like function arguments.

Normal JavaScript:

```js
function greet(name) {
  console.log(name);
}

greet("Rahul");
```

React:

```jsx
function UserCard({ name }) {
  return <h2>{name}</h2>;
}
```

Use it like:

```jsx
<UserCard name="Rahul" />
```

The value:

```jsx
name="Rahul"
```

is passed to the component.

---

# 7. Passing an object as a prop

We can pass an entire user object:

```jsx
function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

Then:

```jsx
<UserCard user={user} />
```

If:

```jsx
const user = {
  name: "Rahul",
  email: "rahul@example.com",
};
```

then inside `UserCard`:

```jsx
user.name
```

returns:

```text
Rahul
```

and:

```jsx
user.email
```

returns:

```text
rahul@example.com
```

---

# 8. What is destructuring?

This:

```jsx
function UserCard({ user }) {
```

is destructuring.

Without destructuring:

```jsx
function UserCard(props) {
  return <h2>{props.user.name}</h2>;
}
```

With destructuring:

```jsx
function UserCard({ user }) {
  return <h2>{user.name}</h2>;
}
```

Both work.

The destructured version is usually easier to read.

---

# 9. Parent and child components

Consider:

```text
UserList
   ↓
UserCard
```

`UserList` is the parent.

`UserCard` is the child.

The parent sends data:

```jsx
<UserCard user={user} />
```

The child receives it:

```jsx
function UserCard({ user }) {
```

The flow is:

```text
Parent
  ↓ props
Child
```

Props should be treated as read-only.

---

# 10. Building a user list

Create a `UserCard` component:

```jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

export default UserCard;
```

Then create `UserList`:

```jsx
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}

export default UserList;
```

The flow is:

```text
users array
    ↓
UserList
    ↓
.map()
    ↓
UserCard
    ↓
HTML on screen
```

---

# 11. Suggested project structure

A simple structure:

```text
src/
├── components/
│   ├── UserCard.js
│   └── UserList.js
│
├── data.js
├── App.js
├── App.css
└── index.js
```

Each file has one responsibility.

```text
data.js
   ↓
stores data

UserCard.js
   ↓
displays one user

UserList.js
   ↓
loops through all users

App.js
   ↓
connects everything together

App.css
   ↓
controls appearance
```

---

# 12. Creating the data

`src/data.js`

```jsx
const users = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@example.com",
    active: true,
  },
  {
    id: 2,
    name: "John",
    email: "john@example.com",
    active: false,
  },
  {
    id: 3,
    name: "Alice",
    email: "alice@example.com",
    active: true,
  },
];

export default users;
```

---

# 13. Creating `UserCard`

`src/components/UserCard.js`

```jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>

      <p>{user.email}</p>

      <span>
        {user.active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

export default UserCard;
```

This introduces conditional rendering:

```jsx
user.active ? "Active" : "Inactive"
```

It means:

```text
if user.active is true
    ↓
show "Active"

otherwise
    ↓
show "Inactive"
```

---

# 14. Creating `UserList`

`src/components/UserList.js`

```jsx
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}

export default UserList;
```

Here:

```jsx
users.map(...)
```

loops through the users.

For every user:

```jsx
<UserCard user={user} />
```

is created.

---

# 15. Creating `App.js`

```jsx
import "./App.css";
import users from "./data";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="app">
      <h1>User Directory</h1>

      <UserList users={users} />
    </div>
  );
}

export default App;
```

The complete data flow is:

```text
data.js
   ↓
App
   ↓
UserList
   ↓
.map()
   ↓
UserCard
   ↓
Browser
```

---

# 16. CSS in React

React uses normal CSS.

Create:

```text
src/App.css
```

Example:

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

.app {
  padding: 30px;
}

.user-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}
```

Then import it:

```jsx
import "./App.css";
```

---

# 17. `className` instead of `class`

Normal HTML:

```html
<div class="user-card">
```

React JSX:

```jsx
<div className="user-card">
```

Use:

```text
className
```

instead of:

```text
class
```

---

# 18. CSS Grid

We can display the cards in a grid.

```css
.user-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(220px, 1fr));

  gap: 20px;
}
```

This creates a responsive layout.

On a large screen:

```text
+---------+ +---------+ +---------+
| Rahul   | | John    | | Alice   |
| Email   | | Email   | | Email   |
+---------+ +---------+ +---------+
```

On a smaller screen:

```text
+---------+
| Rahul   |
+---------+

+---------+
| John    |
+---------+

+---------+
| Alice   |
+---------+
```

---

# 19. Conditional CSS classes

We can change styling depending on user data.

```jsx
<span
  className={
    user.active
      ? "badge badge-on"
      : "badge badge-off"
  }
>
  {user.active ? "Active" : "Inactive"}
</span>
```

Then CSS:

```css
.badge {
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
}

.badge-on {
  background-color: green;
  color: white;
}

.badge-off {
  background-color: red;
  color: white;
}
```

The idea is:

```text
active = true
      ↓
badge-on
      ↓
green badge
```

and:

```text
active = false
      ↓
badge-off
      ↓
red badge
```

---

# 20. Inline styles

React also supports inline CSS.

Example:

```jsx
function Status() {
  return (
    <span
      style={{
        color: "white",
        backgroundColor: "green",
        padding: "4px 8px",
      }}
    >
      Active
    </span>
  );
}
```

Notice:

```jsx
style={{
  color: "white"
}}
```

There are two sets of braces.

The outer `{}` means:

```text
JavaScript expression
```

The inner `{}` is:

```text
JavaScript object
```

Also CSS properties become camelCase.

CSS:

```css
background-color: green;
```

React inline style:

```jsx
backgroundColor: "green"
```

---

# 21. External CSS vs inline styles

For most styling, prefer external CSS.

Example:

```jsx
<div className="user-card">
```

with:

```css
.user-card {
  padding: 20px;
}
```

Inline styles are useful when the value needs to be dynamic.

Example:

```jsx
<div
  style={{
    color: user.active ? "green" : "red",
  }}
>
  {user.name}
</div>
```

---

# 22. Complete example

## `data.js`

```jsx
const users = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@example.com",
    active: true,
  },
  {
    id: 2,
    name: "John",
    email: "john@example.com",
    active: false,
  },
];

export default users;
```

## `UserCard.js`

```jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>

      <p>{user.email}</p>

      <span
        className={
          user.active
            ? "badge badge-on"
            : "badge badge-off"
        }
      >
        {user.active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

export default UserCard;
```

## `UserList.js`

```jsx
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}

export default UserList;
```

## `App.js`

```jsx
import "./App.css";
import users from "./data";
import UserList from "./components/UserList";

function App() {
  return (
    <main className="app">
      <h1>User Directory</h1>

      <UserList users={users} />
    </main>
  );
}

export default App;
```

## `App.css`

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.app {
  padding: 30px;
}

.user-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.user-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}

.user-card h3 {
  margin-top: 0;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 5px;
  color: white;
}

.badge-on {
  background-color: green;
}

.badge-off {
  background-color: red;
}
```

---

# 23. How to read this application

When learning React, follow the data.

Start here:

```text
data.js
```

Then:

```text
data.js
   ↓
App.js
```

`App` passes:

```jsx
<UserList users={users} />
```

Then:

```text
App
 ↓
UserList
```

`UserList` loops:

```jsx
users.map(...)
```

Then:

```text
UserList
   ↓
UserCard
```

Each user is passed as:

```jsx
<UserCard user={user} />
```

Finally:

```text
UserCard
   ↓
JSX
   ↓
DOM
   ↓
Screen
```

So the complete flow is:

```text
Data
 ↓
Props
 ↓
Components
 ↓
JSX
 ↓
React
 ↓
DOM
 ↓
Browser screen
```

---

# 24. Important concepts to remember

### `.map()`

Use it to convert an array into UI elements.

```jsx
users.map((user) => (
  <UserCard user={user} />
))
```

### `key`

Give every mapped component a stable unique key.

```jsx
key={user.id}
```

### Props

Props send data from parent to child.

```jsx
<UserCard user={user} />
```

### Destructuring

Instead of:

```jsx
function UserCard(props) {
  return <h1>{props.user.name}</h1>;
}
```

we can write:

```jsx
function UserCard({ user }) {
  return <h1>{user.name}</h1>;
}
```

### Conditional rendering

```jsx
user.active ? "Active" : "Inactive"
```

### Conditional CSS

```jsx
className={
  user.active
    ? "badge badge-on"
    : "badge badge-off"
}
```

### External CSS

```jsx
import "./App.css";
```

and:

```jsx
<div className="user-card">
```

---

# 25. Practice

## Exercise 1

Create an array:

```jsx
const products = [
  {
    id: 1,
    name: "MacBook",
    price: 120000,
  },
  {
    id: 2,
    name: "iPhone",
    price: 80000,
  },
  {
    id: 3,
    name: "AirPods",
    price: 20000,
  },
];
```

Display every product using `.map()`.

Expected result:

```text
MacBook
₹120000

iPhone
₹80000

AirPods
₹20000
```

---

## Exercise 2

Create:

```jsx
function ProductCard({ product }) {
```

Move the product display logic into this component.

Then render:

```jsx
products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))
```

---

## Exercise 3

Add:

```jsx
inStock: true
```

to every product.

Display:

```text
In Stock
```

or:

```text
Out of Stock
```

depending on the value.

---

## Exercise 4

Add conditional CSS.

Use:

```text
green → In Stock
red   → Out of Stock
```

---

# Summary

The main idea of this module is:

```text
Array of data
     ↓
   .map()
     ↓
React components
     ↓
Props
     ↓
JSX
     ↓
Styled UI
```

Remember these five things:

1. Use `.map()` to display arrays.
2. Every mapped element needs a unique `key`.
3. Props pass data from parent to child.
4. Use `className` to attach CSS classes in React.
5. CSS classes can be selected conditionally based on the data.

Once this pattern is clear, you can display almost anything in React:

```text
Users
Products
Servers
Orders
Pods
Deployments
Logs
Tickets
Notifications
```

The data changes, but the React pattern remains almost the same.
