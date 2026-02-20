const express = require("express");
const passport = require("passport");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log("callback req->", req.user);
    return res.send(req.user);
  }
);

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
