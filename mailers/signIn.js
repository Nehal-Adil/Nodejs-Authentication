const nodemailer = require("../config/nodemailer");

// Send sign in email
exports.signIn = (user) => {
  // Render the email template
  let htmlString = nodemailer.renderTemplate(
    { user: user },
    "/user/signIn.ejs"
  );

  // Send the email
  nodemailer.transporter.sendMail(
    {
      from: "parker12oct@gmail.com",
      to: user.email,
      subject: "You have successfully signed in to Node Authentication!!",
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
