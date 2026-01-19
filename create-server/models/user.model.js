const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  mobile:Number
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
