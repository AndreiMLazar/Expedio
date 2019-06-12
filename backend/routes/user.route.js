const express = require("express");
const fileMiddleware = require("../middleware/file.middleware");

// Router
const router = express.Router();

// Controllers
const UserController = require("../controllers/user.controller");

router.post("/signup", fileMiddleware, UserController.createUser);

router.post("/login", UserController.loginUser);

router.post("/update", fileMiddleware, UserController.updateUser);

module.exports = router;
