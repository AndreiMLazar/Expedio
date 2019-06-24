const express = require("express");

// Router
const router = express.Router();

// Controllers
const OrderController = require("../controllers/order.controller");

router.post("/client/create", OrderController.createClientOrder);
router.get("/client/get/:awb", OrderController.getClientOrder);
router.get("/client/all/:id", OrderController.showClientOrders);
router.post("/company/create", OrderController.createCompanyOrder);
router.get("/company/all/:id", OrderController.showCompanyOrders);
router.post("/agent/create", OrderController.createAgentOrder);

module.exports = router;
