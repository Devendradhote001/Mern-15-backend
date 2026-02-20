const express = require("express");
const {
  getPostCommentsController,
  createCommentController,
} = require("./comment.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/:postId", authMiddleware, getPostCommentsController);
router.post("/create/:postId", authMiddleware, createCommentController);

module.exports = router;
