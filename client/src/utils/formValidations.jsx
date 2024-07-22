import {
  isNotEmpty,
  isValidName,
  isValidEmail,
  isValidPassword,
  showErrorMessage,
} from "./validation";

export const signupValidation = (data) => {
  if (
    !isNotEmpty(data.name) ||
    !isNotEmpty(data.lastName) ||
    !isNotEmpty(data.email) ||
    !isNotEmpty(data.password)
  ) {
    showErrorMessage("Please fill all fields");
    return false;
  }

  if (!isValidName(data.name)) {
    if (data.name.length > 50) {
      showErrorMessage("Your name is too long");
      return false;
    }
    if (data.name.length < 2) {
      showErrorMessage("Your name is too short");
      return false;
    }
    showErrorMessage("Your name should only contain letters");
    return false;
  }

  if (!isValidName(data.lastName)) {
    if (data.lastName.length > 50) {
      showErrorMessage("Your last name is too long");
      return false;
    }
    if (data.lastName.length < 2) {
      showErrorMessage("Your last name is too short");
      return false;
    }
    showErrorMessage("Your last name should only contain letters");
    return false;
  }

  if (!isValidEmail(data.email)) {
    if (data.email.length > 100) {
      showErrorMessage("Your email is too long");
    } else {
      showErrorMessage("Invalid email address");
    }
    return false;
  }

  if (!isValidPassword(data.password)) {
    if (data.password.length > 50) {
      showErrorMessage("Your password is too long");
    } else {
      showErrorMessage("Your password must be at least 6 characters long");
    }
    return false;
  }

  return true;
};
export const signinValidation = (data) => {
  if (!isNotEmpty(data.email) || !isNotEmpty(data.password)) {
    showErrorMessage("Please fill all fields");
    return false;
  }

  if (!isValidEmail(data.email)) {
    if (data.email.length > 100) {
      showErrorMessage("Your email is too long");
    } else {
      showErrorMessage("Invalid email address");
    }
    return false;
  }

  if (!isValidPassword(data.password)) {
    if (data.password.length > 50) {
      showErrorMessage("Your password is too long");
    } else {
      showErrorMessage("Your password must be at least 6 characters long");
    }
    return false;
  }

  return true;
};
export const emailValidation = (data) => {
  if (!isNotEmpty(data.email)) {
    showErrorMessage("Please fill a field");
    return false;
  }

  if (!isValidEmail(data.email)) {
    if (data.email.length > 100) {
      showErrorMessage("Your email is too long");
    } else {
      showErrorMessage("Invalid email address");
    }
    return false;
  }

  return true;
};

export const passwordsValidation = (data) => {
  if (!isNotEmpty(data.CPassword) || !isNotEmpty(data.password)) {
    showErrorMessage("Please fill all fields");
    return false;
  }

  if (!isValidPassword(data.password)) {
    if (data.password.length > 50) {
      showErrorMessage("Your password is too long");
    } else {
      showErrorMessage("Your password must be at least 6 characters long");
    }
    return false;
  }
  if (!isValidPassword(data.CPassword)) {
    if (data.password.length > 50) {
      showErrorMessage("Your confirm password is too long");
    } else {
      showErrorMessage(
        "Your confirm password must be at least 6 characters long"
      );
    }
    return false;
  }
  if (data.password !== data.CPassword) {
    showErrorMessage("Paswords don't match");
    return false;
  }
  return true;
};
export const OTPValidation = (otp) => {
  const otpRegex = /^[A-Z0-9]+$/;

  if (!otp || otp.length !== 6) {
    showErrorMessage("OTP must be exactly 6 characters long.");
    return false;
  }
  if (!otpRegex.test(otp)) {
    showErrorMessage("OTP must contain only uppercase letters and numbers.");
    return false;
  }
  return true;
};
