const express = require("express");
const router = express.Router();

const { User } = require("../models/userModel");

const users = [{ id: 1, name: "John", email: "johndoe@gmail.com" }];

router.post("/addUsers", (req, res) => {
  const newUser = { id: req.body.id, name: req.body.name, email: req.body.email };
  users.push(newUser);
  res.status(201).json({ status: 201, message: "Created", user: newUser });
});

router.post("/addUserstoDB", async (req, res) => {
  try {
    const createdUser = await User.create({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email
    });
    res.status(201).json({ status: 201, message: "Created", user: createdUser });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating user",
      error: error.message,
    });
  }
});

router.get("/getUsers", (req, res) => {
  res.status(200).json(users);
});

router.get("/getUser/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

module.exports = router;