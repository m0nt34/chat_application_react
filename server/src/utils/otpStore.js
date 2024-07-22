
const otpStore = new Map();

const storeOtp = (email, otp) => {
  otpStore.set(email, otp);
  setTimeout(() => otpStore.delete(email), 300000); 
};

const getOtp = (email) => {
  return otpStore.get(email);
};

export { storeOtp, getOtp };
 