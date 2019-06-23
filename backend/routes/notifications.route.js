const express = require("express");

// Router
const router = express.Router();

// Controllers
const NotificationsController = require("../controllers/notifications.controller");

router.post("/", NotificationsController.getUserNotifications);

module.exports = router;
