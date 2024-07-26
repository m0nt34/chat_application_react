import React, { useEffect, useRef, useState } from "react";
import OtpInput from "./OtpInput";
import {
  signUpService,
  checkOtpCode,
  sendOtpEmail,
} from "../../services/authServices";
import { OTPValidation } from "../../utils/formValidations";
import { toast } from "react-toastify";
import ThreeDotsLoadingIcon from "../../assets/icons/Loaders/ThreeDotsLoadingIcon";
import { useNavigate } from "react-router-dom";
const OtpForm = ({ formData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentOtp = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (OTPValidation(currentOtp.current)) {
      setLoading(true);
      const res = await checkOtpCode(formData.email, currentOtp.current);
      if (!res.error) {
        await signUpService(formData);
        toast.success("New account was created successfully");
        navigate("/sign-in");
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    }
  };
  const handleResendCode = async () => {
    setLoading(true);

    await sendOtpEmail(formData.email);
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-5/6 mt-8">
      <OtpInput length={6} currentOtp={currentOtp} />
      <div className="flex gap-5">
        <button
          type="button"
          disabled={loading}
          className="px-4 py-3 bg-slate-400 rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
          onClick={handleResendCode}
        >
          Resend Code
        </button>
        <button
          type="submit"
          disabled={loading}
          className="relative flex items-center justify-center px-4 py-3 bg-customColor-blue rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
        >
          {loading ? <ThreeDotsLoadingIcon /> : <>Confirm Email</>}
        </button>
      </div>
    </form>
  );
};

export default OtpForm;
