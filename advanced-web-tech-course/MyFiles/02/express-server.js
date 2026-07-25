const express = require("express");
const app = express();

app.use(express.json());

const users = [{ id: 1, name: "Ada" }];

app.get("/success", (req, res) => {
  res.status(200).json({ status: 200, message: "OK — request succeeded" });
});

app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name || "Anonymous" };
  users.push(newUser);
  res.status(201).json({ status: 201, message: "Created", user: newUser });
});

app.get("/no-content", (req, res) => {
  res.status(204).end(); // .end() with no body; 204 must not have a body
});

app.get("/bad-request", (req, res) => {
  res.status(400).json({ status: 400, error: "Bad Request — invalid input" });
});

app.get("/unauthorized", (req, res) => {
  res
    .status(401)
    .json({ status: 401, error: "Unauthorized — please log in" });
});

app.get("/not-found", (req, res) => {
  res.status(404).json({ status: 404, error: "Not Found" });
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ status: 400, error: "id must be a number" });
  }
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ status: 404, error: "user not found" });
  }
  res.status(200).json({ status: 200, user });
});


app.get("/server-error", (req, res) => {
  res
    .status(500)
    .json({ status: 500, error: "Internal Server Error — our fault" });
});


app.get("/headers-demo", (req, res) => {
  res.set("X-Powered-By", "AdvancedWebCourse");
  res.set({
    "Cache-Control": "no-store",
    "X-Request-Id": "demo-" + Date.now(),
    "Content-Language": "en",
  });
  res.status(200).json({
    status: 200,
    message: "Check the response headers with `curl -i`",
  });
});

app.use((req, res) => {
  res.status(404).json({ status: 404, error: `No route for ${req.originalUrl}` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
