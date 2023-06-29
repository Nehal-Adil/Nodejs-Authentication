const nodemailer = require("../config/nodemailer");

// Send sign up email
exports.signUp = (user) => {
  // Render the email template
  let htmlString = nodemailer.renderTemplate(
    { user: user },
    "/user/signUp.ejs"
  );

  // Send the email
  nodemailer.transporter.sendMail(
    {
      from: "ananddeveloperthakur@gmail.com",
      to: user.email,
      subject: "Sign Up at Node Authentication!!",
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
