const UserModel = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const CustomError = require("../../utils/CustomError");

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

const manageFollowController = asyncHandler(async (req, res) => {
  let targetUserId = req.params.targetUserId;

  if (!targetUserId) throw new CustomError("Id not found", 400);

  // increase follower
  await UserModel.findByIdAndUpdate(targetUserId, {
    $push: { followers: req.user._id },
  });

  // increse following

  await UserModel.findByIdAndUpdate(req.user._id, {
    $push: { following: targetUserId },
  });

  return res.status(200).json({
    message: "Followed successfully",
    success: true,
  });
});

const manageUnfollowController = asyncHandler(async (req, res) => {
  let targetUserId = req.params.targetUserId;

  if (!targetUserId) throw new CustomError("Id not found", 400);

  await UserModel.findByIdAndUpdate(targetUserId, {
    $pull: { followers: req.user._id },
  });

  await UserModel.findByIdAndUpdate(req.user._id, {
    $pull: { following: targetUserId },
  });

  return res.status(200).json({
    message: "UnFollowed successfully",
    success: true,
  });
});

module.exports = {
  getUserProfileController,
  getTargetUserProfile,
  manageFollowController,
  manageUnfollowController,
};
