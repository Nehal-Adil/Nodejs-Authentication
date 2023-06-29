const nodemailer = require("../config/nodemailer");

// Send forgot password email
exports.forgotPassword = (user) => {
  // Render the email template
  let htmlString = nodemailer.renderTemplate(
    { user: user },
    "/user/forgotPassword.ejs"
  );

  // Send the email
  nodemailer.transporter.sendMail(
    {
      from: "ananddeveloperthakur@gmail.com",
      to: user.email,
      subject: "Forgotten Password",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail:", err);
        return;
      }
      console.log("Message sent:", info);
      return;
    }
  );
};
