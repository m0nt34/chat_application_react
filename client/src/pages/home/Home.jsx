import React, { useEffect } from "react";
import ChatLeftSide from "./leftSide/ChatLeftSide";
import ChatRightSide from "./rightSide/ChatRightSide";

import { useUser } from "../../store/userStore";
import NewChatPopup from "./NewChatPopup";
import ChatSettingPopup from "./chatSetPopup/ChatSettingPopup";

const Home = () => {
  const { fetchAndSetUser } = useUser();
  useEffect(() => {
    fetchAndSetUser();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-10">
      <div className="flex bg-[#262a36] max-w-7xl w-full h-[750px] rounded-3xl overflow-hidden ">
        <ChatLeftSide />
        <ChatRightSide />
        <NewChatPopup />
        <ChatSettingPopup />
      </div>
    </div>
  );
};

export default Home;
