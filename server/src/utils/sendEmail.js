import nodemailer from "nodemailer";

const sendOTPCodeToEmail = async (email, otp, res) => {
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
    subject: "Account Confirmation OTP Code",
    text: `
    Dear User,

    Thank you for registering with our chat application.

    To complete your account confirmation, please use the following OTP code:

    ${otp}

    If you did not attempt to register or create an account with our application, please disregard this email. 

    If you have any questions or need assistance, do not hesitate to contact our support team.

    Best regards,
    The Chat Application Team
    `,
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

export { sendOTPCodeToEmail };