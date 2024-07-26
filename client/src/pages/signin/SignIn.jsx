import React from "react";
import Image from "../../assets/images/mountains.jpg";
import LineSvg2 from "../../assets/SVG/LineSvg2";
import SignInRightSide from "./SignInRightSide";
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
          <SignInRightSide />
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
