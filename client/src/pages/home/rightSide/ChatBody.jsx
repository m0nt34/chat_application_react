import React from "react";

import { useMessageList } from "../../../store/messageList";
import MessageListBody from "./MessageListBody";
import ChatBottomInputField from "./ChatBottomInputField";

const ChatBody = () => {
  return (
    <div className="flex flex-col h-full">
      <MessageListBody />
      <ChatBottomInputField />
    </div>
  );
};

export default ChatBody;
