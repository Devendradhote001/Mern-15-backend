const express = require("express");
const {
  createOrderController,
  verifyPaymentController,
} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-payment-order", createOrderController);
router.post("/verify-payment", verifyPaymentController);

module.exports = router;
