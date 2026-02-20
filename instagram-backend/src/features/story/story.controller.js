const StoryModel = require("../../models/story.model");
const sendFilesToIk = require("../../services/storage.service");
const asyncHandler = require("../../utils/asyncHandler");

const createStoryController = asyncHandler(async (req, res) => {
  let story = req.files;

  if (!story) throw new CustomError("story is required", 400);

  const expiresAt = new Date(Date.now() + 30 * 1000);
  let uploadArr = await Promise.all(
    story.map(
      async ({ buffer, originalname }) =>
        await sendFilesToIk(buffer, originalname)
    )
  );

  let newStory = await StoryModel.create({
    user_id: req.user._id,
    story: uploadArr.map((elem) => elem.url),
    expiresAt: expiresAt,
  });

  return res.status(201).json({
    message: "Story created",
    success: true,
    story: newStory,
  });
});

const setViewsController = asyncHandler(async (req, res) => {
  let storyId = req.params.storyId;

  if (!storyId) throw new CustomError("Story id is required", 400);

  let story = await StoryModel.findById(storyId);

  story.viewers.push(req.user._id);
  await story.save();

  return res.status(200).json({
    message: "Views count increased",
    success: true,
  });
});

module.exports = {
  createStoryController,
  setViewsController,
};
