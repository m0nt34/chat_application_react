import React, { useState, useEffect } from "react";

import WinkFaceIcon from "../../assets/icons/WinkFaceIcon";
import { useUser } from "../../store/userStore";
import { postMessage, getMessages } from "../../services/chatServices";
import { useRoom } from "../../store/currentRomm";
import { showErrorMessage } from "../../utils/validation";
const ChatBody = ({ socket }) => {
  const [messageList, setMessageList] = useState([]);
  const [curMessage, setCurMessage] = useState("");
  const { user } = useUser();
  const { room } = useRoom();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageObj = {
      sender: user._id,
      content: curMessage,
      room: room._id,
    };
    if (curMessage !== "") {
      await socket.emit("send_message", messageObj, (res) => {});
      setMessageList((prev) => [...prev, messageObj]);

      setCurMessage("");

      await postMessage(messageObj);
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
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getMessages(room._id);
      if (!res.error) {
        setMessageList(res.data);
      } else {
        console.log(res.message);
      }
    };

    if (room) {
      fetchMessages();
    }
  }, [room]);
  const myMessage = (id) => {
    return user ? user._id === id : false;
  };

  return (
    <div className="flex flex-col h-full">
      <ul className="flex flex-col gap-4 h-[570px] px-5 pt-5 overflow-y-auto">
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
              {mess.content}
            </span>
          </li>
        ))}
      </ul>
      <form className="flex gap-8 p-5" onSubmit={handleSubmit}>
        <div className="flex w-full gap-5">
          <div className="relative flex items-center bg-gray-700 w-full px-5 py-2 rounded-lg focus-within:border-customColor-blue border-2 border-[#323644]">
            <input
              autoComplete="off"
              className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent text-2xl"
              onChange={(e) => {
                setCurMessage(e.target.value);
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
