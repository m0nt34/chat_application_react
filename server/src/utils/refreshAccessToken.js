import jwt from "jsonwebtoken";
import { generateToken } from "./generateToken.js";
import { createCookie } from "./cookieUtils.js";

const refreshAccessToken = async (req, res, refreshToken) => {
  var accessToken;
  await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const userID = decoded.userID;
      accessToken = generateToken(
        userID,
        process.env.ACCESS_TOKEN_SECRET,
        "1d"
      );

      await createCookie(res, "accessToken", accessToken, 24 * 60 * 60 * 1000);
    }
  );

  return accessToken;
};

export { refreshAccessToken };
