import mongoose from "mongoose";
import Users from "../models/userModel.js";

async function generateHexCode() {

  const userCount = await Users.countDocuments();
  const hexCode = (userCount + 1).toString(16).padStart(6, "0");
  
  return hexCode.toUpperCase();
}

export { generateHexCode };
 