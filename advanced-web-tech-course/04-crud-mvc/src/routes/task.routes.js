// task.routes.js  —  maps URLs + HTTP methods to controller functions.
// This layer is deliberately thin: no logic here, just wiring. It makes the
// API surface easy to read at a glance.

const express = require("express");
const router = express.Router();
const controller = require("../controllers/task.controller");

// The paths below are RELATIVE to where this router is mounted in app.js
// (we mount it at "/api/tasks"), so "/" here means "/api/tasks".

router.post("/", controller.create); // CREATE
router.get("/", controller.findAll); // READ all
router.get("/:id", controller.findOne); // READ one
router.put("/:id", controller.update); // UPDATE
router.delete("/:id", controller.remove); // DELETE

module.exports = router;
