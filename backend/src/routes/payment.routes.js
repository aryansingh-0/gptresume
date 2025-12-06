const express = require("express");
const paymentController = require("../controllers/payment.controller");
const { authenticate } = require('../middlewares/auth')

const router = express.Router();
router.use(authenticate)

// Create new payment order
router.post("/create-order", paymentController.createOrder);

// Verify payment after success
router.post("/verify-payment", paymentController.verifyPayment);

 

module.exports = router;
