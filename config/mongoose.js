const mongoose = require("mongoose");

// Set the strictQuery option to true or false
mongoose.set("strictQuery", false);

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost/nodejs_authentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle connection errors
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// Execute when the database connection is open
db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;
