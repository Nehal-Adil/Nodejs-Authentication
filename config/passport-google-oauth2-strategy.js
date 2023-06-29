const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("node:crypto");
const User = require("../models/user");
const googleMailer = require("../mailers/google");

// Tell passport to use a new strategy for Google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "143650549988-uo3jsch9kd7b53nuq88vmdtjjfrb5q85.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in Google strategy-passport", err);
          return;
        }

        if (user) {
          // If found, set this user as req.user and send confirmation email
          googleMailer.google(user);
          return done(null, user);
        } else {
          // If not found, create the user and set it as req.user, then send confirmation email
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "Error in creating user Google strategy-passport",
                  err
                );
                return;
              }
              googleMailer.google(user);
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
