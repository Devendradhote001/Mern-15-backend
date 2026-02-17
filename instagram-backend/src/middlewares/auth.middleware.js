const UserModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) throw new CustomError("Unauthorized user", 400);

  let decode = jwt.verify(token, process.env.JWT_SECRET);

  if (!decode) throw new CustomError("Unauthorized user", 403);

  let user = await UserModel.findById(decode.id);

  req.user = user;
  next();
});

module.exports = authMiddleware;
