const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  forgetPasswordController,
  resetPasswordController,
  updatePasswordController,
} = require("./auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/forget-password", forgetPasswordController);
router.get("/reset-password/:token", resetPasswordController);
router.post("/update-password/:userId", updatePasswordController);

router.get(
  "/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/nahii",
  }),
  (req, res) => {
    let user = req.user;
    let token = user.generateJWT();

    res.cookie("token", token);
    return res.status(200).json({
      message: "Logged in",
      user,
    });
  }
);

router.get("/nahii", (req, res) => {
  res.send("nahi ho paya");
});

router.post("/register", upload.single("image"), registerController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
