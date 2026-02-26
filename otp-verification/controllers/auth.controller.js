const OtpModel = require("../models/otp.model");
const UserModel = require("../models/user.model");
const sendMail = require("../services/mail.service");
const { generateOtp, hashOtp, compareOtp } = require("../utils/otp");

const registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let newUser = await UserModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let user = await UserModel.findOne({ email });

    if (user.password !== password)
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });

    if (!user)
      return res.status(404).json({
        message: "User not found",
        success: false,
      });

    return res.status(200).json({
      message: "User Loggedin",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const sendOtpController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted)
      return res.status(404).json({
        message: "user not found",
      });

    let genOtp = generateOtp();
    let strOtp = genOtp.toString();

    let hashedOtp = await hashOtp(strOtp);

    await OtpModel.deleteOne({ email });

    let newOtp = await OtpModel.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendMail(
      email,
      "Your OTP for forget password",
      `<h1>Your one time password code is ${genOtp}</h1>
      <p>OTP is valid only for 5 minutes</p>
      `
    );

    return res.status(201).json({
      message: "OTP sent to registered email",
      success: true,
    });
  } catch (error) {
    console.log("error while sending otp", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    let { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({
        message: "Email and otp are required",
      });

    let isOtpExist = await OtpModel.findOne({
      email,
    });

    if (!isOtpExist)
      return res.status(404).json({
        message: "invalid request",
      });

    if (isOtpExist.expiresAt < Date.now()) {
      await OtpModel.deleteOne({ email });
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (isOtpExist.attempts >= 6) {
      await OtpModel.deleteOne({ email });
      return res.status(400).json({
        message: "Max attempts reached, please try again after 24 hrs",
      });
    }

    let compare = await compareOtp(otp, isOtpExist.otp);

    if (!compare) {
      isOtpExist.attempts++;
      return res.status(400).json({
        message: "Invalid otp",
      });
    }

    await OtpModel.deleteOne({ email });

    return res.status(200).json({
      message: "OTP verified",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  sendOtpController,
  verifyOtpController,
};
