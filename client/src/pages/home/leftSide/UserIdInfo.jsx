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
        <div className="flex flex-col bg-[#3e4f69] right-[-50px] z-30 items-start absolute text-white text-[18px] px-4 py-2 rounded-md font-semibold">
          <p className="select-none">user&nbsp;code:</p>
          <div className=" flex">
            <p className="select-none">#&nbsp;</p>
            {user.code}
          </div>
          <button
            onClick={() => {
              authToF();
              logOut();
            }}
            className="w-full select-none mt-2 rounded-md p-1 transition hover:bg-slate-500"
          >
            log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserIdInfo;
