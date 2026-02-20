const { default: mongoose, mongo } = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  },
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("error in pre method", error);
  }
});

userSchema.methods.checkPassword = async function (enteredPass) {
  return await bcrypt.compare(this.password, enteredPass);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, "dsvfjkhasbfjdsgkh", {
    expiresIn: "1h",
  });
};

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
