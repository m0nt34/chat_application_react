import React from "react";
import OtpInput from "../UI/OtpInput";
const OtpForm = ({ setOtpSection }) => {
  const onOtpSubmit = (otp) => {
    console.log(otp);
  };
  return (
    <div className="w-5/6">
      <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
    </div>
  );
};

export default OtpForm;
