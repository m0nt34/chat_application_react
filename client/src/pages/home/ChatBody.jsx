import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../store/userStore";
import { postMessage, getMessages } from "../../services/chatServices";
import { useRoom } from "../../store/currentRomm";
import Emojis from "./Emojis";

const ChatBody = ({ socket }) => {
  const [messageList, setMessageList] = useState([]);
  const [curMessage, setCurMessage] = useState("");
  const { user } = useUser();
  const { room } = useRoom();
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageObj = {
      sender: user._id,
      content: curMessage.trim(),
      room: room._id,
    };
    if (curMessage.trim() !== "") {
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messageList]);

  return (
    <div className="flex flex-col h-full">
      <ul className="message-box">
        {messageList.map((mess, i) => {
          let mymessage = myMessage(mess.sender);
          return (
            <li
              key={i}
              className={mymessage ? "flex justify-end" : "flex justify-start"}
              style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
            >
              <div className="flex flex-col max-w-80 w-fit">
                <p
                  className={`flex w-full text-[12px] mb-[2px] text-[#ccc] ${
                    mymessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {mess.time}
                </p>
                <span
                  className={
                    mymessage
                      ? "text-white text-xl bg-customColor-blue rounded-xl p-2 px-3 rounded-br-sm"
                      : "text-white text-xl bg-[#525e72] rounded-xl p-2 px-3 rounded-bl-sm"
                  }
                >
                  {mess.content}
                </span>
              </div>
            </li>
          );
        })}
        <div ref={messagesEndRef} />
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
          <Emojis setCurMessage={setCurMessage} curMessage={curMessage} />
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
