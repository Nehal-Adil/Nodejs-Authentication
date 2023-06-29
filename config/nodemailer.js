const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// Create a nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "gmail", // Email service provider
  host: "smtp.gmail.com", // SMTP host
  port: 587, // SMTP port
  secure: false, // Use secure connection
  auth: {
    user: "ananddeveloperthakur@gmail.com", // Email account
    pass: "lccbdoatezprzjzv", // Email account password
  },
});

// Function to render the email template
let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath), // Path to the email template
    data, // Data to be passed to the template
    function (err, template) {
      if (err) {
        console.log("Error in rendering the template", err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter, // Export the nodemailer transporter
  renderTemplate: renderTemplate, // Export the renderTemplate function
};
