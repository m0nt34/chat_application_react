import React from "react";
import GoogleIcon from "../../assets/icons/authIcons/GoogleIcon";
import FacebookIcon from "../../assets/icons/authIcons/FacebookIcon";
import GithubIcon from "../../assets/icons/authIcons/GithubIcon";
const Auth = () => {
  return (
    <>
      <button className="flex items-center justify-between bg-gray-700 w-full px-5 py-3 rounded-lg  border-2 border-[#323644] text-white">
        <p>Continue with Google</p>
        <GoogleIcon />
      </button>
      <button className="flex items-center justify-between bg-gray-700 w-full px-5 py-3 rounded-lg  border-2 border-[#323644] text-white">
        <p>Continue with Facebook</p>
        <FacebookIcon />
      </button>
      <button className="flex items-center justify-between bg-gray-700 w-full px-5 py-3 rounded-lg  border-2 border-[#323644] text-white">
        <p>Continue with Github</p>

        <GithubIcon />
      </button>
    </>
  );
};

export default Auth;
