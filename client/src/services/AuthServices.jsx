import axios from "axios";
import { toast } from "react-toastify";

export const checkIfuserExists = async (email) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/check/user", {
      email,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message ||
        "An error occurred while checking the user.",
    };
  }
};
export const sendOtpEmail = async (email) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/send-email", {
      email,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message ||
        "An error occurred while sending code.",
    };
  }
};
export const checkOtpCode = async (email, otp) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/check/otp", {
      email,
      otp,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message ||
        "An error occurred while checking otp.",
    };
  }
};
export const signUpService = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/signup", data);
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message ||
        "An error occurred while creating user.",
    };
  }
};
export const signInService = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/login", data);
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again.",
    };
  }
};
