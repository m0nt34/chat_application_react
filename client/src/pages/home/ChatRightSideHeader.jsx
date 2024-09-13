import React from "react";
import ChatDefaultImg from "../../assets/images/chatDefault.jpg";
import privateChateImg from "../../assets/images/user.jpg";
import { useRoom } from "../../store/currentRomm";
import { useUser } from "../../store/userStore";
import Gear from "../../assets/icons/Gear";

const ChatRightSideHeader = () => {
  const { room } = useRoom();
  const { user } = useUser();

  const isAdmin = room?.admins?.some((admin) => admin === user._id);

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
      {isAdmin && (
        <button>
          <Gear className="text-[28px] text-[#ccc]" color="#ccc"/>
        </button>
      )}
    </header>
  );
};

export default ChatRightSideHeader;
