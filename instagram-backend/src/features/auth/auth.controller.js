const UserModel = require("../../models/user.model");
const sendFilesToIk = require("../../services/storage.service");
const asyncHandler = require("../../utils/asyncHandler");
const CustomError = require("../../utils/CustomError");

const registerController = asyncHandler(async (req, res) => {
  let { username, name, email, password, bio } = req.body;

  if (!username || !email || !password)
    throw new CustomError("username and email and password are required", 400);

  if (!req.file) throw new CustomError("Files are required", 400);

  let isExist = await UserModel.findOne({ email });

  if (isExist) throw new CustomError("User already exists!", 400);

  let { buffer, originalname } = req.file;

  let pp = await sendFilesToIk(buffer, originalname);

  let newUser = await UserModel.create({
    name,
    username,
    email,
    password,
    bio,
    profile_pic: pp.url,
  });

  let token = newUser.generateJWT();

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered",
    success: true,
    user: newUser,
  });
});

const loginController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    throw new CustomError("Email and password is required", 400);

  let existed = await UserModel.findOne({ email });

  if (!existed) throw new CustomError("user not found", 404);

  let checkPass = existed.comparePass(password);

  if (!checkPass) throw new CustomError("Invalid credentials", 401);

  let token = existed.generateJWT();

  res.cookie("token", token);
  return res.status(200).json({
    message: "User Logged in",
    success: true,
    user: existed,
  });
});

const logoutController = asyncHandler(async (req, res) => {
  let userId = req.user._id;

  if (!userId) throw new CustomError("Unauthorized user", 400);

  res.clearCookie("token");

  return res.status(200).json({
    message: "User Logged out",
    success: true,
  });
});

module.exports = {
  registerController,
  loginController,
  logoutController,
};
