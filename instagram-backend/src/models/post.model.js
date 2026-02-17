const { default: mongoose, Types } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    caption: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let PostModel = mongoose.model("posts", postSchema);
module.exports = PostModel;
