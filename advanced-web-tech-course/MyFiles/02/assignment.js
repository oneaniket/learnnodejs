const express = require("express");
const app = express();

app.use(express.json());

const users = [{ id: 1, name: "John", email: "johndoe@gmail.com" }];

app.post("/addUsers", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name, email: req.body.email };
  users.push(newUser);
  res.status(201).json({ status: 201, message: "Created", user: newUser });
});


app.get("/getUsers", (req, res) => {
  res.status(200).json(users)
});

app.get("/getUser/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id))
  res.status(200).json(user)
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
