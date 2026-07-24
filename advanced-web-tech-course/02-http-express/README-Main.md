# Node.js Express Routing Tutorial

A beginner-friendly guide to routing in **Node.js using Express**.

This project demonstrates:

- Basic Express setup
- HTTP methods
- Route parameters
- Query parameters
- Request bodies
- Express Router
- Controllers
- Middleware
- Error handling
- Async route handlers
- A simple CRUD API

---

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm

Check the versions:

```bash
node --version
npm --version
```

---

## Project Setup

Create a new project:

```bash
mkdir express-routing-demo
cd express-routing-demo
npm init -y
```

Install Express:

```bash
npm install express
```

Create an `app.js` file:

```bash
touch app.js
```

---

## Basic Express Application

Add the following code to `app.js`:

```js
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

Start the application:

```bash
node app.js
```

Open:

```text
http://localhost:3000
```

---

## Route Syntax

An Express route follows this format:

```js
app.METHOD(PATH, HANDLER);
```

Example:

```js
app.get("/users", (req, res) => {
  res.send("List of users");
});
```

- `METHOD` is the HTTP method.
- `PATH` is the request URL.
- `HANDLER` is the function that processes the request.
- `req` contains request information.
- `res` is used to send a response.

---

## HTTP Methods

### GET

Used to retrieve data.

```js
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Aniket" },
    { id: 2, name: "Rahul" },
  ]);
});
```

Test it:

```bash
curl http://localhost:3000/users
```

### POST

Used to create data.

```js
app.post("/users", (req, res) => {
  const newUser = req.body;

  res.status(201).json({
    message: "User created",
    user: newUser,
  });
});
```

Test it:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Aniket","email":"aniket@example.com"}'
```

### PUT

Usually replaces an entire resource.

```js
app.put("/users/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} replaced`,
    user: req.body,
  });
});
```

### PATCH

Usually updates part of a resource.

```js
app.patch("/users/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} updated`,
    updates: req.body,
  });
});
```

### DELETE

Used to delete a resource.

```js
app.delete("/users/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} deleted`,
  });
});
```

---

## Route Parameters

Route parameters are dynamic values inside the URL.

```js
app.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
  });
});
```

Request:

```text
GET /users/123
```

Response:

```json
{
  "id": "123"
}
```

Multiple route parameters:

```js
app.get("/users/:userId/orders/:orderId", (req, res) => {
  res.json({
    userId: req.params.userId,
    orderId: req.params.orderId,
  });
});
```

---

## Query Parameters

Query parameters are added after `?` in the URL.

```text
GET /users?role=admin&page=2
```

Access them using `req.query`:

```js
app.get("/users", (req, res) => {
  res.json({
    role: req.query.role,
    page: req.query.page,
  });
});
```

Use route parameters to identify a resource:

```text
/users/123
```

Use query parameters for filtering, sorting, searching, and pagination:

```text
/users?role=admin&page=2
```

---

## Request Body

JSON request data is available through `req.body`.

Make sure this middleware is enabled:

```js
app.use(express.json());
```

Example:

```js
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  res.status(201).json({
    id: 1,
    name,
    email,
  });
});
```

---

## Using Express Router

For larger applications, routes should be separated into different files.

Recommended structure:

```text
project/
├── app.js
└── routes/
    └── users.js
```

Create `routes/users.js`:

```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Aniket" },
    { id: 2, name: "Rahul" },
  ]);
});

router.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "User created",
    user: req.body,
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} deleted`,
  });
});

module.exports = router;
```

Update `app.js`:

```js
const express = require("express");
const userRoutes = require("./routes/users");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

The following router route:

```js
router.get("/:id");
```

Becomes:

```text
GET /users/:id
```

---

## Controllers

Controllers keep route definitions separate from business logic.

Recommended structure:

```text
project/
├── app.js
├── routes/
│   └── users.js
└── controllers/
    └── usersController.js
```

Create `controllers/usersController.js`:

```js
const users = [
  { id: 1, name: "Aniket" },
  { id: 2, name: "Rahul" },
];

function getUsers(req, res) {
  res.json(users);
}

function getUserById(req, res) {
  const userId = Number(req.params.id);

  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
```

Update `routes/users.js`:

```js
const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

module.exports = router;
```

---

## Middleware

Middleware runs before the final route handler.

Example authentication middleware:

```js
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authorization token missing",
    });
  }

  next();
}
```

Use it on a route:

```js
app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Private profile",
  });
});
```

Request flow:

```text
Request
  ↓
Middleware
  ↓
Route Handler
  ↓
Response
```

The `next()` function passes control to the next middleware or route handler.

---

## Multiple Middleware Functions

```js
function logRequest(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
}

function authenticate(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}

app.get("/admin", logRequest, authenticate, (req, res) => {
  res.json({
    message: "Welcome admin",
  });
});
```

Middleware runs from left to right.

---

## Route Order

Express checks routes in the order they are registered.

Incorrect order:

```js
app.get("/users/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

app.get("/users/admin", (req, res) => {
  res.send("Admin user");
});
```

In this case, `admin` may be treated as an ID.

Correct order:

```js
app.get("/users/admin", (req, res) => {
  res.send("Admin user");
});

app.get("/users/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

Always place more specific routes before dynamic routes.

---

## 404 Handler

Add the 404 handler after all valid routes:

```js
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
```

---

## Error-Handling Middleware

Express error-handling middleware has four parameters:

```js
function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
}
```

Register it after all routes:

```js
app.use(errorHandler);
```

Send errors to it using `next(error)`:

```js
app.get("/error", (req, res, next) => {
  const error = new Error("Something failed");
  next(error);
});
```

---

## Async Route Handlers

Async route handlers are commonly used for database and API calls.

```js
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

Reusable async wrapper:

```js
function asyncHandler(handler) {
  return function (req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
```

Usage:

```js
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  })
);
```

---

## Complete CRUD Example

```js
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Aniket" },
  { id: 2, name: "Rahul" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (req.body.name !== undefined) {
    user.name = req.body.name;
  }

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((item) => item.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users.splice(userIndex, 1);

  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## Testing the CRUD API

Get all users:

```bash
curl http://localhost:3000/users
```

Get one user:

```bash
curl http://localhost:3000/users/1
```

Create a user:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Amit"}'
```

Update a user:

```bash
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Aniket Pawar"}'
```

Delete a user:

```bash
curl -X DELETE http://localhost:3000/users/1
```

---

## Important Express Request Properties

| Property | Purpose | Example |
|---|---|---|
| `req.params` | Dynamic URL values | `/users/:id` |
| `req.query` | Query string values | `/users?page=2` |
| `req.body` | JSON request body | POST or PATCH data |
| `req.headers` | Request headers | Authorization token |
| `next()` | Continue middleware chain | Pass to next handler |

---

## Recommended Project Structure

```text
src/
├── app.js
├── routes/
│   └── users.routes.js
├── controllers/
│   └── users.controller.js
├── services/
│   └── users.service.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
└── models/
    └── user.model.js
```

---

## Summary

Express routing connects an HTTP method and URL path to a handler function.

The most important concepts are:

- Use `GET` to retrieve data.
- Use `POST` to create data.
- Use `PUT` or `PATCH` to update data.
- Use `DELETE` to remove data.
- Use `req.params` for URL parameters.
- Use `req.query` for query strings.
- Use `req.body` for request payloads.
- Use `express.Router()` to organize routes.
- Use middleware for reusable request processing.
- Add 404 and error handlers after all routes.
- Keep routes, controllers, and business logic separate in larger projects.
