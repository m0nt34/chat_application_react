import crypto from "crypto";
const generateOtp = async () => {
  const generatedOtp = await crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase();
  return generatedOtp;
};
export { generateOtp };
