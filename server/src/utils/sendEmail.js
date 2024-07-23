import nodemailer from "nodemailer";

const sendEmail = async (email, emailSubject, emailText, res) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "redmerabi@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: "redmerabi@gmail.com",
    to: email,
    subject: emailSubject,
    text: emailText,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return res.json({
      error: true,
      message: "Error sending email",
      error: err,
    });
  }
};

export { sendEmail };
