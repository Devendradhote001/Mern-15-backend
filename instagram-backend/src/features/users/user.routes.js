const express = require("express");
const {
  getUserProfileController,
  getTargetUserProfile,
} = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfileController);
router.get("/profile/:targetUser", authMiddleware, getTargetUserProfile);

module.exports = router;
