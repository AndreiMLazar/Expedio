const express = require("express");

// Router
const router = express.Router();

// Controllers
const OrderController = require("../controllers/order.controller");

router.post("/client/create", OrderController.createClientOrder);
router.get("/client/get/:awb", OrderController.getOrder);
router.get("/client/all/:id", OrderController.showClientOrders);

module.exports = router;
