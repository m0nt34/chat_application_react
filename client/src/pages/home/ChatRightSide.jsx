import React from "react";
import ChatBody from "./ChatBody";
import ChatRightSideHeader from "./ChatRightSideHeader";
const ChatRightSide = ({ socket }) => {
  return (
    <div className="flex flex-col h-full w-2/3">

      <ChatRightSideHeader  />
      <ChatBody socket={socket} />
    </div>
  );
};

export default ChatRightSide;
