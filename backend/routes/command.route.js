const express = require("express");

// Router
const router = express.Router();

// Controllers
const CommandController = require("../controllers/command.controller");

router.post("/client/create", CommandController.createClientCommand);
router.get("/client/commands/:id", CommandController.showClientCommands);

module.exports = router;
