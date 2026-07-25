const express = require("express");
const app = express();

app.use(express.json());

const users = [{ id: 1, name: "Ada" }];


app.get("/", (req, res) => {
    // res.status(200).json({ name: "RundownTrex" });
    res.status(200).send("RundownTrex")
});


app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name || "Anonymous" };
  users.push(newUser);
  res.status(201).json({ status: 201, message: "Created", user: newUser });

})



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
  console.log("Try these:");
  console.log("  curl -i http://localhost:3000/success");
  console.log("  curl -i -X POST -H 'Content-Type: application/json' \\");
  console.log("       -d '{\"name\":\"Grace\"}' http://localhost:3000/users");
  console.log("  curl -i http://localhost:3000/headers-demo");
});
