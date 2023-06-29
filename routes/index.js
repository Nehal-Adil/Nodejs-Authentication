const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");

// Home route
router.get("/", userController.home);

// Sign up route
router.get("/sign-up", userController.signUp);

// Sign up form submission route
router.post("/create", userController.create);

// Local authentication route (login)
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  userController.createSession
);

// Google authentication routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  userController.createSession
);

// Profile route
router.get("/profile", passport.checkAuthentication, userController.profile);

// Sign out route
router.get("/sign-out", userController.destroySession);

// Forgot password route
router.get("/forgot-password", userController.forgotPassword);

// Forgot password form submission route
router.post("/create-password", userController.createPassword);

// Reset password route
router.get(
  "/reset-password",
  passport.checkAuthentication,
  userController.resetPassword
);

// Reset password form submission route
router.post(
  "/profile/create-password",
  passport.checkAuthentication,
  userController.newPassword
);

module.exports = router;
