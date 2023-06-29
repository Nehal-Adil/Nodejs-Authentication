const express = require("express");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");

// Middleware for EJS layouts
const expressLayouts = require("express-ejs-layouts");

// Connect to MongoDB using Mongoose
const db = require("./config/mongoose");

// Configure session handling
const session = require("express-session");
// Initialize Passport.js for authentication
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const custMiddleware = require("./config/middleware");

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "assets" directory
app.use(express.static("assets"));

app.use(expressLayouts);

// Extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "nodejs-authentication",
    secret: "Starter-Code-Authentication-System",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Cookie expiration time: 100 minutes
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/nodejs_authentication",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "mongo-db setup is ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Middleware to set the authenticated user in the views
app.use(passport.setAuthenticatedUser);
// Flash messages middleware
app.use(flash());
// Custom middleware to set flash messages in views
app.use(custMiddleware.setFlash);

// Routes
app.use("/", require("./routes"));

// Start the server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
  }
  console.log(`We are running the server at port: ${port}`);
});
