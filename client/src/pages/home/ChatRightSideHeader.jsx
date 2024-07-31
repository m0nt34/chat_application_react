import React from "react";
import ChatDefaultImg from "../../assets/images/chatDefault.jpg";
import privateChateImg from "../../assets/images/user.jpg";

import { useRoom } from "../../store/currentRomm";
import ThreeDots from "../../assets/icons/ThreeDots";
const ChatRightSideHeader = () => {
  const { room } = useRoom();

  return (
    <header className="flex items-center justify-between pr-10 gap-5 w-full border-b border-gray-700 p-5">
      <div className="flex items-center justify-start gap-5">
        <img
          src={room.private ? privateChateImg : ChatDefaultImg}
          alt=""
          className="rounded-full h-12"
        />
        <h1 className="text-2xl text-white">{room.name}</h1>
      </div>
      <button>
        <ThreeDots />
      </button>
    </header>
  );
};

export default ChatRightSideHeader;
