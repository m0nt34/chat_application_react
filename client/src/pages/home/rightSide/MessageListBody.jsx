import React ,{useRef,useEffect} from "react";
import { useMessageList } from "../../../store/messageList";
import { myMessage } from "../../../utils/myMessageFunc";
import socket from "../../../services/socket";
const MessageListBody = () => {
  
  const { setMessageList,messageList } = useMessageList();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const handleMessageReceive = (data) => {
      setMessageList(data);
    };
    socket.on("receive_message", handleMessageReceive);
    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messageList]);
  return (
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
              <span
                className={
                  mymessage
                    ? "text-white text-xl bg-customColor-blue rounded-xl p-2 px-3 rounded-br-sm"
                    : "text-white text-xl bg-[#525e72] rounded-xl p-2 px-3 rounded-bl-sm"
                }
              >
                {mess.content}
              </span>
              <p
                className={`flex w-full text-[12px] mt-[2px] text-[#ccc] ${
                  mymessage ? "justify-end" : "justify-start"
                }`}
              >
                {mess.time}
              </p>
            </div>
          </li>
        );
      })}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default MessageListBody;
