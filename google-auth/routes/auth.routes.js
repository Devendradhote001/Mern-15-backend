const express = require("express");
const passport = require("passport");

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

router.post("/register", (req, res) => {
  res.send("register");
});

module.exports = router;
