const { default: mongoose, mongo } = require("mongoose");
const passport = require("passport");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "12345678",
    },
    google_id: {
      type: String,
    },
    provider: {
      type: String,
      default: "GOOGLE",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
