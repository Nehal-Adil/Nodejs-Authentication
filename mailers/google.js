const nodemailer = require("../config/nodemailer");

// Send Google authentication email
exports.google = (user) => {
  // Render the email template
  let htmlString = nodemailer.renderTemplate(
    { user: user },
    "/user/google_auth.ejs"
  );

  // Send the email
  nodemailer.transporter.sendMail(
    {
      from: "parker12oct@gmail.com",
      to: user.email,
      subject: "You have successfully Sign-In/Sign-Up to Node Authentication!!",
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
