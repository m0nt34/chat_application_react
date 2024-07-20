import React, { useRef } from "react";
import OtpInput from "../UI/OtpInput";
import { signUpService } from "../../services/authServices";
import { OTPValidation } from "../../utils/formValidations";
const OtpForm = ({ formData }) => {
  const currentOtp = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (OTPValidation(currentOtp.current)) {
      console.log(currentOtp.current);
    }
    //signUpService(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-5/6 mt-8">
      <OtpInput length={6} currentOtp={currentOtp} />
      <div className="flex gap-5">
        <button
          type="button"
          className="px-4 py-3 bg-slate-400 rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
        >
          Resend Code
        </button>
        <button
          type="submit"
          className="px-4 py-3 bg-customColor-blue rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
        >
          Confirm Email
        </button>
      </div>
    </form>
  );
};

export default OtpForm;
