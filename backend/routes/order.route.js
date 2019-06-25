const express = require("express");

// Router
const router = express.Router();

// Controllers
const OrderController = require("../controllers/order.controller");

router.post("/client/create", OrderController.createClientOrder);

router.get("/client/get/:awb", OrderController.getClientOrder);

router.get("/client/all/:email", OrderController.showClientOrders);

router.post("/company/create", OrderController.createCompanyOrder);

router.get("/company/all/:email", OrderController.showCompanyOrders);

router.get("/agent/all/:email", OrderController.showAgentOrders);

router.post("/agent/create", OrderController.createAgentOrder);

module.exports = router;
