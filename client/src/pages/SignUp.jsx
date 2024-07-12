import React from "react";
import Image from "../assets/images/mountains.jpg";
import LineSvg from "../assets/icons/LineSvg";
const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div
        className="flex h-96 rounded-xl overflow-hidden max-w-xl w-full shadow-lg"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-xl w-full bg-custom-gradient">
          <LineSvg className={'absolute left-48 h-96 w-fit'}/>
        </div>
      
      </div>
    </div>
  );
};

export default SignUp;