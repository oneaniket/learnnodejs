// task.routes.js — maps URLs to controller functions. Mounted at /api/tasks.
const express = require("express");
const router = express.Router();
const c = require("../controllers/task.controller");

router.get("/", c.findAll); // READ all
router.post("/", c.create); // CREATE
router.put("/:id", c.update); // UPDATE (toggle done)
router.delete("/:id", c.remove); // DELETE

module.exports = router;
