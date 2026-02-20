const { default: mongoose } = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    story: [
      {
        type: String,
        required: true,
      },
    ],
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    expiresAt: {
      type: Date,
      index: { expireAfterSeconds: 10 },
    },
  },
  {
    timestamps: true,
  }
);

let StoryModel = mongoose.model("stories", storySchema);
module.exports = StoryModel;
