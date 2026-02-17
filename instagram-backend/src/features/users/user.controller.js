const UserModel = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");

const getUserProfileController = asyncHandler(async (req, res) => {
  let userP = await UserModel.findById(req.user._id).populate(
    "posts",
    "images videos"
  );

  let posts = userP.posts.length;
  let followers = userP.followers.length;
  let following = userP.following.length;

  let userProfile = { ...userP, posts, followers, following };

  return res.status(200).json({
    message: "Profile fetched",
    success: true,
    user: userProfile,
  });
});

const getTargetUserProfile = asyncHandler(async (req, res) => {
  let targetUserId = req.params.targetUser;

  if (!targetUserId) throw new CustomError("Something went wrong", 400);

  let userP = await UserModel.findById(targetUserId).populate(
    "posts",
    "images videos"
  );

  let posts = userP.posts.length;
  let followers = userP.followers.length;
  let following = userP.following.length;

  let targetUserProfile = { ...userP, posts, followers, following };

  return res.status(200).json({
    message: "Profile fetched",
    success: true,
    user: targetUserProfile,
  });
});

module.exports = {
  getUserProfileController,
  getTargetUserProfile,
};
