const UserModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");

const registerController = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new CustomError("All fields are required", 400);

  let newUser = await UserModel.create({
    name,
    email,
    password,
  });

  let token = newUser.generateJWT();

  res.cookie("token", token);
  return res.status(201).json({
    message: "user registered",
    success: true,
    user: newUser,
  });
});

const loginController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    throw new CustomError("All fields are required", 400);

  let existingUser = await UserModel.findOne({ email });
  if (!existingUser) throw new CustomError("User not found", 404);

  let checkPass = existingUser.checkPassword(password);
  if (!checkPass) throw new CustomError("Invalid email or password", 403);

  let token = existingUser.generateJWT();

  res.cookie("token", token);
  return res.status(200).json({
    message: "user Logged in",
    success: true,
    user: existingUser,
  });
});

module.exports = {
  registerController,
  loginController,
};
