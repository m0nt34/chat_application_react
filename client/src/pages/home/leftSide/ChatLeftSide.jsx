import React, { useState } from "react";
import userImg from "../../../assets/images/user.jpg";
import LeftSideHeader from "./LeftSideHeader";
import ChatLists from "./ChatLists";
import "../../../assets/styles/style.css";

const ChatLeftSide = ({ socket }) => {
  return (
    <div className="flex flex-col gap-5 h-full w-1/3 bg-[#1d212b] p-5">
      <LeftSideHeader userImg={userImg} />
      <div className="users-box">
        <ChatLists socket={socket} />
      </div>
    </div>
  );
};

export default ChatLeftSide;
