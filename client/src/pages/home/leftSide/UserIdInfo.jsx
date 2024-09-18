import React, { useState } from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import { useUser } from "../../../store/userStore";
import { useAuth } from "../../../store/authStore";
import { logOut } from "../../../services/authServices";
const UserIdInfo = () => {
  const [show, setShow] = useState(false);
  const { user } = useUser();
  const { authToF } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className="cursor-pointer"
      >
        <ThreeDots />
      </button>
      {show && (
        <div className="flex flex-col bg-[#2f3544] right-0 z-30 items-start absolute text-white text-[18px] px-4 py-2 rounded-md font-semibold">
          <div className="border-b border-[#4c5774] pb-2 w-full items-center justify-center">

          <div className="flex w-full items-center justify-center">
          
            {user.code}
          </div>
          </div>
          <button
            onClick={() => {
              authToF();
              logOut();
            }}
            className="w-full whitespace-nowrap select-none mt-2 rounded-md p-1 transition hover:bg-[#3e475f]"
          >
            log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserIdInfo;
