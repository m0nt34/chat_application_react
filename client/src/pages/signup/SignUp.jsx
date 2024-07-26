import React from "react";
import Image from "../../assets/images/mountains.jpg";
import LineSvg from "../../assets/SVG/LineSvg";
import SignUpLeftSide from "./SignUpLeftSide";

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
          <div className="flex flex-col w-[53%] h-full gap-20 z-10">
            <header className="flex items-center justify-center gap-4 w-fit text-white font-bold select-none text-4xl ">
              <span className="w-8 h-8 rounded-full bg-customColor-blue"></span>
              Chat app
            </header>
            
          <SignUpLeftSide/>
          </div>
          <LineSvg
            className={
              "absolute left-[54%] top-0 h-full w-fit pointer-events-none"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
