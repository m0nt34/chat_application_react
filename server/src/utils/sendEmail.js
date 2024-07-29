import nodemailer from "nodemailer";

const sendEmail = async (email, emailSubject, emailText) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "redmerabi@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
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
    console.error("Error sending email:", err);
    throw new Error("Failed to send email");
  }
};

export { sendEmail };