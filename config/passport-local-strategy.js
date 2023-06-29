const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const signInMailer = require("../mailers/signIn");

// Authentication using Passport
passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async function (req, email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          req.flash("error", "Invalid UserName/Password");
          return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // Passwords match, proceed with user authentication and send sign-in confirmation email
          signInMailer.signIn(user);
          return done(null, user);
        } else {
          // Passwords don't match, respond with an authentication error
          req.flash("error", "Invalid UserName/Password");
          return done(null, false);
        }
      } catch (err) {
        req.flash("error", err);
        return done(err);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    return done(null, user);
  });
});

// Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // If the user is signed in, pass on the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not signed in, redirect to the homepage
  return res.redirect("/");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed-in user from the session cookie, and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
