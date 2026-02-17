const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("./auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer");

const router = express.Router();

router.post("/register", upload.single("image"), registerController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
