const express = require("express");

// Router
const router = express.Router();

// Controllers
const OrderController = require("../controllers/order.controller");

router.post("/client/create", OrderController.createClientOrder);
router.get("/client/orders/:id", OrderController.showClientOrders);

module.exports = router;
