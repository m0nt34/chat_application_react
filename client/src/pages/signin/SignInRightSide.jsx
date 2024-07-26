import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/form/Form";
const SignInRightSide = () => {
  const [formData, setFormData] = useState({});
  return (
    <div className="flex flex-col w-[53%] h-full mt-20  gap-6 select-none">
      <span className="text-gray-400 font-bold">WELCOME BACK</span>
      <h1 className="flex flex-wrap items-end text-white text-5xl font-bold gap-1 leading-10">
        <span className="mr-2">Sign in to</span>{" "}
        <span className="flex items-end">
          {" "}
          account
          <span className="h-2 w-2 rounded-full bg-customColor-blue ml-1"></span>
        </span>
      </h1>

      <p className="text-gray-400 font-bold">
        Don't have an account?{" "}
        <Link to="/sign-up" className="cursor-pointer text-customColor-blue">
          Sign Up
        </Link>
      </p>
      <Form LogInPage={true} formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default SignInRightSide;
