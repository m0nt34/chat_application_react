import jwt from "jsonwebtoken";
import { generateAccessToken } from "./generateToken.js";
import { createAccessTokenCookie } from "./cookieUtils.js";

const refreshAccessToken = async (req, res, refreshToken) => {
  await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const userID = decoded.userID;
      const accessToken = generateAccessToken(userID);

      createAccessTokenCookie(res, accessToken);
    }
  );
};

export { refreshAccessToken };
