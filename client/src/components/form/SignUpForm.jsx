import React, { useState } from "react";
import Form from "./Form";
import OtpForm from "./OtpForm";
const SignUpForm = () => {
  const [otpForm, setOtpForm] = useState(false);
  const setOtpSection = () => {
    setOtpForm(!otpForm);
  };
  return (
    <>
      {otpForm ? (
        <OtpForm setOtpSection={setOtpSection} />
      ) : (
        <Form LogInPage={false} setOtpSection={setOtpSection} />
      )}
    </>
  );
};

export default SignUpForm;
