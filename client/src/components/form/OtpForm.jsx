import React from "react";
import OtpInput from "../UI/OtpInput";
const OtpForm = ({ formData }) => {
  const onOtpSubmit = (otp) => {
    console.log(otp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-5/6 mt-8">
      <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
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
