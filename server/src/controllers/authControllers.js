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
export default {
  createUser: async (req, res) => {
    try {
      const userInfo = req.body;
      // if (!userInfo.password || userInfo.password.length < 8) {
      //   return res
      //   .status(400)
      //   .json({ message: "Password must be at least 8 characters long." });
      // }
       
      console.log(userInfo);
      const hashedPassword = await bcrypt.hash(userInfo.password, 10);
      userInfo.password = hashedPassword
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
  
      const isPasswordMatch = passwordCheck(
        foundUser[0].password,
        password
      );
  
      if (!isPasswordMatch) throw new Error("Password do not match!");

  
      const accessToken = await generateAccessToken(userID);
      const refreshToken = await generateRefreshToken(userID);
  
      await createAccessTokenCookie(res, accessToken);
      await createRefreshTokenCookie(res, refreshToken);
  
      return res.status(200).send(foundUserData);
    } catch (error) {
      return res.status(500).json({
        status: "fail",
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
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
  },
};