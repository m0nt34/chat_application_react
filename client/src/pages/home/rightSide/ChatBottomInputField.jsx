import React, { useState, useEffect, useRef } from "react";
import { getMessageObj } from "../../../utils/getMessageObj";
import { postMessage } from "../../../services/chatServices";
import Emojis from "./Emojis";
import { useRoom } from "../../../store/currentRomm";
import { useMessageList } from "../../../store/messageList";
import { useEmojis } from "../../../store/emojisContainer";
import socket from "../../../services/socket";
const ChatBottomInputField = () => {
  const { setMessageList, fetchMessages } = useMessageList();
  const { setEmojisToFalse } = useEmojis();
  const [curMessage, setCurMessage] = useState("");
  const { room } = useRoom();
  const inputFieldRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (curMessage.trim() !== "") {
      const messageObj = getMessageObj(curMessage, room._id);
      await socket.emit("send_message", messageObj, (res) => {});
      setMessageList(messageObj);
      setCurMessage("");
      setEmojisToFalse();
      inputFieldRef.focus;
      await postMessage(messageObj);
    }
  };
  useEffect(() => {
    const fetchMessagesFunc = async () => {
      fetchMessages(room._id);
    };
    if (room) {
      fetchMessagesFunc();
    }
  }, [room]);
  return (
    <form className="flex gap-8 p-5" onSubmit={handleSubmit}>
      <div className="flex w-full gap-5">
        <div className="relative flex items-center bg-gray-700 w-full px-5 py-2 rounded-lg focus-within:border-customColor-blue border-2 border-[#323644]">
          <input
            autoComplete="off"
            ref={inputFieldRef}
            className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent text-2xl"
            onChange={(e) => {
              setCurMessage(e.target.value);
            }}
            value={curMessage}
          />
        </div>
        <Emojis setCurMessage={setCurMessage} curMessage={curMessage} />
      </div>
      <button
        type="submit"
        className="bg-customColor-blue text-white text-xl px-5 rounded-lg hover:opacity-85 transition"
      >
        Send
      </button>
    </form>
  );
};

export default ChatBottomInputField;
