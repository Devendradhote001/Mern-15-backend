const express = require("express");
const {
  getUserProfileController,
  getTargetUserProfile,
  manageFollowController,
  manageUnfollowController,
} = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfileController);
router.get("/profile/:targetUser", authMiddleware, getTargetUserProfile);
router.get("/follow/:targetUserId", authMiddleware, manageFollowController);
router.get("/unfollow/:targetUserId", authMiddleware, manageUnfollowController);

module.exports = router;
