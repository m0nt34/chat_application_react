import React, { useState, useEffect } from "react";

import WinkFaceIcon from "../../assets/icons/WinkFaceIcon";
import { useUser } from "../../store/userStore";
import { postMessage } from "../../services/chatServices";
const ChatBody = ({ socket }) => {
  const [messageList, setMessageList] = useState([]);
  const [curMessage, setFormData] = useState("");
  const { user } = useUser();
  const handleSumbim = async (e) => {
    e.preventDefault();
    if (curMessage !== "") {
      const messageObj = {
        sender: user._id,
        content: curMessage,
      };
      await socket.emit("send_message", messageObj);
      setMessageList((prev) => [...prev, messageObj]);
      setFormData("");
    }
  };
  useEffect(() => {
    const handleMessageReceive = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", handleMessageReceive);
    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket]);
  const myMessage = (id) => {
    
    //return user._id === id ? true : false;
    return true;
  };
  return (
    <div className="flex flex-col h-full">
      <ul className="flex flex-col gap-5 h-[570px] px-5 pt-5 overflow-y-auto">
        {messageList.map((mess, i) => (
          <li
            key={i}
            className={myMessage(mess.sender) ? "flex justify-end" : "flex"}
            style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
          >
            <span
              className={
                myMessage(mess.sender)
                  ? "flex flex-wrap text-white text-xl bg-[#525e72] max-w-80 w-fit rounded-xl p-2 px-3 rounded-br-sm"
                  : "flex flex-wrap text-white text-xl bg-customColor-blue max-w-80 w-fit rounded-xl p-2 px-3 rounded-bl-sm"
              }
            >
              {mess.message}
            </span>
          </li>
        ))}
      </ul>
      <form className="flex gap-8 p-5" onSubmit={handleSumbim}>
        <div className="flex w-full gap-5">
          <div className="relative flex items-center bg-gray-700 w-full px-5 py-2 rounded-lg focus-within:border-customColor-blue border-2 border-[#323644]">
            <input
              autoComplete="off"
              className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent text-2xl"
              onChange={(e) => {
                setFormData(e.target.value);
              }}
              value={curMessage}
            />
          </div>
          <button type="button">
            <WinkFaceIcon />
          </button>
        </div>
        <button
          type="submit"
          className="bg-customColor-blue text-white text-xl px-5 rounded-lg hover:opacity-85 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBody;
