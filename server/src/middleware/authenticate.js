import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";
const authenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken || req.header("accessToken");
  const refreshToken = req.cookies.refreshToken || req.header("refreshToken");

  if (!accessToken) {
    if (!refreshToken) {
      return res.status(401).json({
        message: "No entry without auth",
      });
    }
    await refreshAccessToken(req, res, refreshToken);
    next();
  } else {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError" && refreshToken) {
          refreshAccessToken(req, res, refreshToken);
          next();
        } else {
          return res.status(403).json({ message: "Invalid access token" });
        }
      } else {
        next();
      }
    });
  }
};

export  { authenticate };
