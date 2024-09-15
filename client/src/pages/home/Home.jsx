import React, { useEffect } from "react";
import ChatLeftSide from "./leftSide/ChatLeftSide";
import ChatRightSide from "./ChatRightSide";
import io from "socket.io-client";
import { useUser } from "../../store/userStore";
import NewChatPopup from "./NewChatPopup";
import ChatSettingPopup from "./ChatSettingPopup";
const socket = io.connect("http://localhost:3001/");
const Home = () => {
  const { fetchAndSetUser } = useUser();
  useEffect(() => {
    fetchAndSetUser();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-10">
      <div className="flex bg-[#262a36] max-w-7xl w-full h-[750px] rounded-3xl overflow-hidden ">
        <ChatLeftSide socket={socket} />
        <ChatRightSide socket={socket} />
        <NewChatPopup />
        <ChatSettingPopup />
      </div>
    </div>
  );
};

export default Home;
