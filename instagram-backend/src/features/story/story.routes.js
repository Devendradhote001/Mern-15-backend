const express = require("express");
const {
  createStoryController,
  setViewsController,
} = require("./story.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.array("stories"),
  createStoryController
);
router.get("/story-view/:storyId", authMiddleware, setViewsController);

module.exports = router;
