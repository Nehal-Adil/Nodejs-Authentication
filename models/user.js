const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the User model using the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
