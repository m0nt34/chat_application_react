import bcrypt from "bcrypt";
import Users from "../models/userModel.js";
import passwordCheck from "../utils/passwordCheck.js";
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
import { sendOTPCodeToEmail } from "../utils/sendEmail.js";
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
      await sendOTPCodeToEmail(email, otp, res);
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
      const savedUser = await new Users(userInfo).save();

      return res.status(201).json(savedUser);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error creating user", error: err });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const foundUser = await Users.find({ email });
      if (!foundUser.length) throw new Error("email isn't correct!");

      const isPasswordMatch = passwordCheck(foundUser[0].password, password);

      if (!isPasswordMatch) throw new Error("Password do not match!");

      const accessToken = await generateAccessToken(userID);
      const refreshToken = await generateRefreshToken(userID);

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
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error verifying authentication", error: err });
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
};
