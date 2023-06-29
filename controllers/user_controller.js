const bcrypt = require("bcrypt");
const User = require("../models/user");
const crypto = require("node:crypto");
const signUpMailer = require("../mailers/signUp");
const forgotPasswordMailer = require("../mailers/forgotPassword");
const resetPasswordMailer = require("../mailers/resetPassword");

// Render the sign-in page
module.exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  }
  return res.render("user_sign_in", {
    title: "Nodejs Authentication",
  });
};

// Render the sign-up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  }
  return res.render("user_sign_up", {
    title: "Nodejs Authentication",
  });
};

// Create a new user
module.exports.create = async function (req, res) {
  try {
    const { email, password, confirm_password, name } = req.body;
    // Validate form data
    if (password !== confirm_password) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email already registered");
      return res.redirect("back");
    }
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, name });
    signUpMailer.signUp(req.body);
    await newUser.save();

    req.flash("success", "User registered successfully");
    return res.redirect("/");
  } catch (error) {
    req.flash("error", error);
    return res.redirect("/");
  }
};

// Create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully");
  return res.redirect("/profile");
};

// Render the user's profile page
module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Nodejs Authentication",
  });
};

// Destroy the session (log out the user)
module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out");
    res.redirect("/");
  });
};

// Render the forgot password page
module.exports.forgotPassword = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  }
  return res.render("forgot_password", {
    title: "Nodejs Authentication",
  });
};

// Create a new password for the user
module.exports.createPassword = async function (req, res) {
  try {
    const { email } = req.body;
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("back");
    }
    // Generate a random password
    const newPassword = crypto.randomBytes(8).toString("hex");
    // Encrypt the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    forgotPasswordMailer.forgotPassword(user);
    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();
    req.flash("success", "Your new password has been generated successfully");
    return res.redirect("/");
  } catch (error) {
    req.flash("error", error);
    return res.redirect("/");
  }
};

// Render the reset password page
module.exports.resetPassword = function (req, res) {
  return res.render("reset_password", {
    title: "Nodejs Authentication",
  });
};

// Set a new password for the user
module.exports.newPassword = async function (req, res) {
  try {
    const { new_password, confirm_password } = req.body;
    // Validate form data
    if (new_password !== confirm_password) {
      req.flash("error", "New passwords do not match");
      return res.redirect("back");
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email: req.user.email });

    // Encrypt password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    // Update user's password in the database
    user.password = hashedPassword;
    resetPasswordMailer.resetPassword(user);
    await user.save();
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Your password has been reset successfully");
      return res.redirect("/");
    });
  } catch (error) {
    req.flash("error", error);
    return res.redirect("/profile");
  }
};
