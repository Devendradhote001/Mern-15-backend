const CommentModel = require("../../models/comment.model");
const asyncHandler = require("../../utils/asyncHandler");

const getPostCommentsController = asyncHandler(async (req, res) => {
  let postId = req.params.postId;

  if (!postId) throw new CustomError("post id not found", 400);

  let comments = await CommentModel.find({ post_id: postId });

  return res.status(201).json({
    message: "comments fetched",
    success: true,
    comments,
  });
});

const createCommentController = asyncHandler(async (req, res) => {
  let postId = req.params.postId;

  if (!postId) throw new CustomError("post id not found", 400);

  let { text } = req.body;

  if (!text) throw new CustomError("Id not found", 400);

  let newComment = await CommentModel.create({
    user_id: req.user._id,
    post_id: postId,
    text,
  });

  return res.status(201).json({
    message: "Comment posted",
    success: true,
    comment: newComment,
  });
});

module.exports = {
  getPostCommentsController,
  createCommentController,
};
