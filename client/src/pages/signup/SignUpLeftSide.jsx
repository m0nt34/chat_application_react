import React, { useState } from "react";
import { Link } from "react-router-dom";
import OtpForm from "./OtpForm";
import Form from "../../components/form/Form";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
const SignUpLeftSide = () => {
  const [otpForm, setOtpForm] = useState(false);
  const [formData, setFormData] = useState({});
  const setOtpSection = () => {
    setOtpForm(!otpForm);
  };
  return (
    <div className="flex flex-col gap-6 select-none">
      {otpForm ? (
        <button
          onClick={setOtpSection}
          className="flex text-gray-400 font-bold w-fit"
        >
          <ArrowLeftIcon />
          GO BACK
        </button>
      ) : (
        <span className="text-gray-400 font-bold">START FOR FREE</span>
      )}
      {otpForm ? (
        <h1 className="flex flex-wrap items-end  text-white text-5xl font-bold gap-1 leading-10">
          <span className="mr-2"> Confirm </span>{" "}
          <span className="mr-2"> your</span>
          <span className="flex items-end">
            {" "}
            email
            <span className="h-2 w-2 rounded-full bg-customColor-blue ml-1"></span>
          </span>
        </h1>
      ) : (
        <h1 className="flex flex-wrap items-end  text-white text-5xl font-bold gap-1 leading-10">
          <span className="mr-2"> Create </span>{" "}
          <span className="mr-2"> new</span>
          <span className="flex items-end">
            {" "}
            account
            <span className="h-2 w-2 rounded-full bg-customColor-blue ml-1"></span>
          </span>
        </h1>
      )}
      {otpForm ? (
        <p className="text-gray-400 font-bold w-5/6">
          An OTP code has been sent to your email address. Please enter the code
          below to verify your email and complete the registration process.
        </p>
      ) : (
        <p className="text-gray-400 font-bold">
          Already have an account?{" "}
          <Link to="/sign-in" className="cursor-pointer text-customColor-blue">
            Log In
          </Link>
        </p>
      )}

      {otpForm ? (
        <OtpForm formData={formData} />
      ) : (
        <Form
          LogInPage={false}
          setOtpSection={setOtpSection}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default SignUpLeftSide;
