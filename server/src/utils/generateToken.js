import jwt from "jsonwebtoken";

const generateToken = (userID,secret,time) => {
  return jwt.sign({ userID },secret, {
    expiresIn: time,
  });
};

export {  generateToken};
