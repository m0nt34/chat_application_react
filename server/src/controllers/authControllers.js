import bcrypt from "bcrypt";
import Users from "../models/userModel.js";
import { createCookie } from "../utils/cookieUtils.js";
import { generateToken } from "../utils/generateToken.js";
import { generateOtp } from "../utils/createOtp.js";
import { storeOtp, getOtp } from "../utils/otpStore.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateHexCode } from "../utils/generateCode.js";
import { passwordCheck } from "../utils/passwordCheck.js";
import jwt, { decode } from "jsonwebtoken";
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
      storeOtp(email, otp);

      const emailSubject = "Account Confirmation OTP Code";
      const emailText = `
      Dear User,
      
      Thank you for registering with our chat application.
      
      To complete your account confirmation, please use the following OTP code:
      
      ${otp}
      
      If you did not attempt to register or create an account with our application, please disregard this email. 
      
      If you have any questions or need assistance, do not hesitate to contact our support team.
      
      Best regards,
      The Chat Application Team`;
      await sendEmail(email, emailSubject, emailText, res);
      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Error creating user", error: error });
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
        .json({ error: true, message: "Error creating user", error: error });
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

      const accessToken = await generateToken(
        userIdString,
        process.env.ACCESS_TOKEN_SECRET,
        "1d"
      );
      const refreshToken = await generateToken(
        userIdString,
        process.env.REFRESH_TOKEN_SECRET,
        "7d"
      );

      await createCookie(res, "accessToken", accessToken, 24 * 60 * 60 * 1000);
      await createCookie(
        res,
        "refreshToken",
        refreshToken,
        7 * 24 * 60 * 60 * 1000
      );
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
      const accessToken =
        res.locals.accessToken ||
        req.cookies.accessToken ||
        req.header("accessToken");

      if (!accessToken) {
        return res.status(401).json({ error: true });
      }

      await jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ error: true });
          }
          return res.json({
            error: false,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Error verifying authentication",
        error: error,
      });
    }
  },

  logoutUser: (req, res) => {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .json({ error: false, message: "Logout successful" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Error logging out", error: error });
    }
  },
  sendLink: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          error: true,
          message: "Email is required",
        });
      }
      const foundUser = await Users.findOne({ email });
      if (!foundUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      const userIdString = foundUser._id.toString();
      const token = generateToken(userIdString, process.env.LINK_TOKEN, "5m");
      const emailSubject = "Password Reset Request";
      const emailText = `
      Dear User,
 
      We received a request to reset the password for your account. 

      To proceed with resetting your password, please use the following link:

      http://localhost:5173/reset-password/${token}
 
      If you did not request a password reset, please ignore this email. Your password will remain unchanged.

      If you have any questions or need further assistance, please contact our support team.

      Best regards,
      The Chat Application Team`;
      await sendEmail(email, emailSubject, emailText, res);
      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Error sending link", error: error });
    }
  },
  checkLink: async (req, res) => {
    try {
      const { token } = req.body;

      const decoded = await jwt.verify(
        token,
        process.env.LINK_TOKEN,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ error: true, message: err });
          } else {
            return decoded;
          }
        }
      );

      const userID = decoded.userID;

      res.json({ error: false, data: userID });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, message: "Token expired", error: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { userID, password } = req.body;

      if (!userID || !password) {
        return res
          .status(400)
          .json({ error: true, message: "User ID and password are required" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await Users.findByIdAndUpdate(
        userID,
        { password: hashedPassword },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      res.json({ error: false, message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Failed to update password",
        error: error,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const token = req.cookies.accessToken || req.header("accessToken");

      if (!token) {
        return res
          .status(401)
          .json({ error: true, message: "no token provided" });
      }
      const decoded = await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ error: true, message: err });
          } else {
            return decoded;
          }
        }
      );
      const user = await Users.findById(decoded.userID).populate({
        path: "chats",
        select: "name private admins",
      });

      if (!user) {
        return res
          .status(401)
          .json({ error: true, message: "no token provided" });
      }
      return res.json({ error: false, data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Failed to update password",
        error: error,
      });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({ message: "Logout successful" });
  },
};
