const nodemailer = require("../config/nodemailer");

// Send reset password email
exports.resetPassword = (user) => {
  // Render the email template
  let htmlString = nodemailer.renderTemplate(
    { user: user },
    "/user/resetPassword.ejs"
  );

  // Send the email
  nodemailer.transporter.sendMail(
    {
      from: "parker12oct@gmail.com",
      to: user.email,
      subject: "Reset Password",
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
