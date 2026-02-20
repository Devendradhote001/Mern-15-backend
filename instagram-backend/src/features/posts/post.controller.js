const PostModel = require("../../models/post.model");
const UserModel = require("../../models/user.model");
const sendFilesToIk = require("../../services/storage.service");
const asyncHandler = require("../../utils/asyncHandler");
const CustomError = require("../../utils/CustomError");

const createPostController = asyncHandler(async (req, res) => {
  let { caption } = req.body;

  if (!caption) throw new CustomError("caption is required", 400);

  let files = req.files;

  if (!files) throw new CustomError("files is required", 400);

  let uploadArr = await Promise.all(
    req.files.map(
      async ({ buffer, originalname }) =>
        await sendFilesToIk(buffer, originalname)
    )
  );

  let videos = uploadArr.map((elem) => elem.url.slice(-3) === "mp4");

  let images = uploadArr.filter((elem) => elem.url.slice(-3) !== "mp4");

  let newPost;

  if (videos.length) {
    newPost = await PostModel.create({
      videos: videos.map((elem) => elem.url),
      caption,
      user_id: req.user._id,
    });
  } else {
    newPost = await PostModel.create({
      images: images.map((elem) => elem.url),
      caption,
      user_id: req.user._id,
    });
  }

  await UserModel.findByIdAndUpdate(req.user._id, {
    $push: { posts: newPost._id },
  });

  return res.status(201).json({
    message: "post created",
    success: true,
    post: newPost,
  });
});

const getAllPostController = asyncHandler(async (req, res) => {
  let allPosts = await PostModel.find();

  return res.status(200).json({
    message: "All posts fetched",
    success: true,
    posts: allPosts,
  });
});

const getSinglePostController = asyncHandler(async (req, res) => {
  let postId = req.params.postId;

  if (!postId) throw new CustomError("Something went wrong", 400);

  let post = await PostModel.findById(postId);

  return res.status(200).json({
    message: "post fetched",
    success: true,
    post,
  });
});

module.exports = {
  createPostController,
  getAllPostController,
  getSinglePostController,
};
