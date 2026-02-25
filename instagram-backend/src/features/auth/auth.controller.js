const UserModel = require("../../models/user.model");
const sendMail = require("../../services/mail.service");
const sendFilesToIk = require("../../services/storage.service");
const asyncHandler = require("../../utils/asyncHandler");
const CustomError = require("../../utils/CustomError");
const jwt = require("jsonwebtoken");

const registerController = asyncHandler(async (req, res) => {
  let { username, name, email, password, bio } = req.body;

  if (!username || !email || !password)
    throw new CustomError("username and email and password are required", 400);

  if (!req.file) throw new CustomError("Files are required", 400);

  let isExist = await UserModel.findOne({ email });

  if (isExist) throw new CustomError("User already exists!", 400);

  let { buffer, originalname } = req.file;

  let pp = await sendFilesToIk(buffer, originalname);
  console.log("profile pic->", pp);

  let newUser = await UserModel.create({
    name,
    username,
    email,
    password,
    bio,
    profilePic: pp.url,
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

const forgetPasswordController = asyncHandler(async (req, res) => {
  let { email } = req.body;

  if (!email) throw new CustomError("email is requires", 400);

  let existedUser = await UserModel.findOne({ email });

  if (!existedUser) throw new CustomError("user not found", 404);

  let resetToken = jwt.sign(
    { id: existedUser._id },
    process.env.JWT_RAW_SECRET,
    { expiresIn: "10m" }
  );

  let resetLink = `http://localhost:3000/api/auth/reset-password/${resetToken}`;

  await sendMail("devendradhote179@gmail.com", "Reset password", resetLink);

  return res.status(200).json({
    message: "Link send to email",
    success: true,
  });
});

const resetPasswordController = asyncHandler(async (req, res) => {
  let token = req.params.token;

  if (!token) throw new CustomError("Token not found", 404);

  let verifyJWT = jwt.verify(token, process.env.JWT_RAW_SECRET);

  if (!verifyJWT) throw new CustomError("Unauthorized email", 401);

  return res.render("updatepass", { user_id: verifyJWT.id });
});

const updatePasswordController = asyncHandler(async (req, res) => {
  let userId = req.params.userId;

  if (!userId) throw new CustomError("userId not found", 404);

  let { password } = req.body;
  if (!password) throw new CustomError("password is required ", 400);

  let user = await UserModel.findById(userId);

  user.password = password;
  await user.save();

  return res.status(200).json({
    message: "Password updated",
    success: true,
  });
});

module.exports = {
  registerController,
  loginController,
  logoutController,
  forgetPasswordController,
  resetPasswordController,
  updatePasswordController,
};
