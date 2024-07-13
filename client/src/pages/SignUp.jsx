import React from "react";
import Image from "../assets/images/mountains.jpg";
import LineSvg from "../assets/icons/LineSvg";
import { Link } from "react-router-dom";
import Form from "../components/form/Form";
const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div
        className="flex h-[700px] rounded-3xl overflow-hidden max-w-5xl w-full shadow-lg"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-5xl w-full bg-custom-gradient p-10">
          <div className="flex flex-col w-[53%] h-full gap-24 z-10">
            <header className="flex items-center justify-center gap-4 w-fit text-white font-bold select-none text-4xl ">
              <span className="w-8 h-8 rounded-full bg-customColor-blue"></span>
              Chat app
            </header>
            <div className="flex flex-col gap-6 select-none">
              <span className="text-gray-400 font-bold">
                START FOR FREE
              </span>
              <h1 className="flex items-end  text-white text-5xl font-bold gap-1">
                Create new account
                <span className="h-2 w-2 rounded-full bg-customColor-blue mb-1"></span>
              </h1>
              <p className="text-gray-400 font-bold">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="cursor-pointer text-customColor-blue"
                >
                  Log In
                </Link>
              </p>
              <Form />
            </div>
          </div>
          <LineSvg className={"absolute left-[525px] top-0 h-full w-fit pointer-events-none"} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
