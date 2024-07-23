import bcrypt from "bcrypt";
import Users from "../models/userModel.js";
import {
  createAccessTokenCookie,
  createRefreshTokenCookie,
} from "../utils/cookieUtils.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { generateOtp } from "../utils/createOtp.js";
import { storeOtp, getOtp } from "../utils/otpStore.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateHexCode } from "../utils/generateCode.js";
import { passwordCheck } from "../utils/passwordCheck.js";
export default {
  userExists: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          error: true,
          message: "Email is required",
        });
      }
      const findemail = await Users.findOne({ email });
      if (findemail) {
        return res.status(400).json({
          error: true,
          message: "User with such email already exists",
        });
      } else {
        return res.status(200).json({
          error: false,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  sendOtpEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const otp = await generateOtp();
      await storeOtp(email, otp);
      const emailSubject = "Account Confirmation OTP Code";
      const emailText = `
    Dear User,

    Thank you for registering with our chat application.

    To complete your account confirmation, please use the following OTP code:

    ${otp}

    If you did not attempt to register or create an account with our application, please disregard this email. 

    If you have any questions or need assistance, do not hesitate to contact our support team.

    Best regards,
    The Chat Application Team
    `;
      await sendEmail(email, emailSubject,emailText, res);
      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Error creating user", error: err });
    }
  },
  checkOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const storedOtp = await getOtp(email);

      if (!storedOtp) {
        return res.status(400).json({
          error: true,
          message: "No OTP found for this email or OTP has expired",
        });
      }

      if (otp !== storedOtp) {
        return res.status(400).json({
          error: true,
          message: "Invalid OTP",
        });
      }

      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "An error occurred while verifying the OTP",
        details: error.message,
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const userInfo = req.body;

      const hashedPassword = await bcrypt.hash(userInfo.password, 10);
      userInfo.password = hashedPassword;
      const code = await generateHexCode();
      const updatedInfo = new Users({
        ...userInfo,
        code,
      });
      const savedUser = await new Users(updatedInfo).save();

      return res.status(201).json({ error: false, data: savedUser });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error creating user", error: error });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const foundUser = await Users.findOne({ email });
      if (!foundUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      const isPasswordMatch = await passwordCheck(foundUser.password, password);

      if (!isPasswordMatch) {
        return res.status(401).json({
          error: true,
          message: "Invalid password",
        });
      }

      const userIdString = foundUser._id.toString();

      const accessToken = await generateAccessToken(userIdString);
      const refreshToken = await generateRefreshToken(userIdString);

      await createAccessTokenCookie(res, accessToken);
      await createRefreshTokenCookie(res, refreshToken);

      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Data retrieval failed",
        errors: error.message,
      });
    }
  },

  isLoggedIn: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken || req.header("accessToken");
      if (!accessToken) {
        return res.json({ isAuthenticated: false });
      }

      await jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res.json({ isAuthenticated: false });
          }
          return res.json({ isAuthenticated: true, userID: decoded.userID });
        }
      );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error verifying authentication", error: error });
    }
  },

  logoutUser: (req, res) => {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error logging out", error: err });
    }
  },
  sendLink: async(req, res) => {
    try {
      const { email } = req.body;
      const emailSubject = "Account Confirmation OTP Code";
      const emailText = `
    Dear User,

    Thank you for registering with our chat application.

    To complete your account confirmation, please use the following OTP code:

    http://localhost:5173/reset-password/${token}

    If you did not attempt to register or create an account with our application, please disregard this email. 

    If you have any questions or need assistance, do not hesitate to contact our support team.

    Best regards,
    The Chat Application Team
    `;
      await sendEmail(email, emailSubject,emailText, res);
      return res.status(200).json({
        error: false,
      });
    } catch (error) {}
  },
};
