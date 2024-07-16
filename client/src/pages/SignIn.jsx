import React from "react";
import Image from "../assets/images/mountains.jpg";
import LineSvg2 from "../assets/SVG/LineSvg2";
import { Link } from "react-router-dom";
import Form from "../components/form/Form";

const SignIn = () => {
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
        <div className="flex flex-col items-end relative max-w-5xl w-full bg-custom-gradient2 p-10">
          <header className="flex items-center gap-4 w-full text-white font-bold select-none text-4xl ">
            <span className="w-8 h-8 rounded-full bg-customColor-blue"></span>
            Chat app
          </header>
          <div className="flex flex-col w-[53%] h-full mt-20 z-10">
            <div className="flex flex-col gap-6 select-none">
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
                <Link
                  to="/sign-up"
                  className="cursor-pointer text-customColor-blue"
                >
                  Sign Up
                </Link>
              </p>
              <Form LogInPage={true}/>
              
            </div>
          </div>
          <LineSvg2
            className={
              "absolute left-[35%] top-0 h-full w-fit pointer-events-none z-20"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
