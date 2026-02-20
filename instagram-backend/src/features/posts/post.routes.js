const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const {
  createPostController,
  getAllPostController,
  getSinglePostController,
} = require("./post.controller");
const upload = require("../../config/multer");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.array("images"),
  createPostController
);
router.get("/", authMiddleware, getAllPostController);
router.get("/:postId", authMiddleware, getSinglePostController);

module.exports = router;
