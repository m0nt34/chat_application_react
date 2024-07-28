import React, { useEffect, useState,useRef } from "react";
import Image from "../../assets/images/mountains.jpg";
import LineSvg from "../../assets/SVG/LineSvg";
import PasswordsForm from "./PasswordsForm";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTokenLink } from "../../services/authServices";
import { showErrorMessage } from "../../utils/validation";
const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const errorShownRef = useRef(false);
  const userID = useRef(null)

  const sendNewPassword = async (token) => {
    const res = await checkTokenLink(token);
    if (res.error && !errorShownRef.current) {
      showErrorMessage(res.message);
      console.log("error accoured here");
      errorShownRef.current = true;
      navigate("/sign-in");
    } else {
      userID.current = res.data
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const path = location.pathname;
    const token = path.replace("/reset-password/", "");
    sendNewPassword(token);
  }, []);
  return (
    !loading && (
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
              <div className="flex flex-col gap-6 select-none">
                <span className="text-gray-400 font-bold">
                  Enter New Password
                </span>
                <h1 className="flex flex-wrap items-end  text-white text-5xl font-bold gap-1 leading-10">
                  <span className="mr-2"> Reset </span>{" "}
                  <span className="mr-2"> your</span>
                  <span className="flex items-end">
                    {" "}
                    password
                    <span className="h-2 w-2 rounded-full bg-customColor-blue ml-1"></span>
                  </span>
                </h1>
                <p className="text-gray-400 font-bold w-5/6">
                  Try not to forget your password! Choose something that is
                  easier to remember.
                </p>
                <PasswordsForm userID={userID.current}/>
              </div>
            </div>
            <LineSvg
              className={
                "absolute left-[54%] top-0 h-full w-fit pointer-events-none"
              }
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ResetPassword;
