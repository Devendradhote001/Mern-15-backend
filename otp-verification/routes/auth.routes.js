const express = require("express");
const {
  registerController,
  loginController,
  sendOtpController,
  verifyOtpController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);

module.exports = router;
