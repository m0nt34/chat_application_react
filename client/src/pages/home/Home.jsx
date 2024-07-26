import React from "react";
import ChatLeftSide from "./ChatLeftSide";
import ChatRightSide from "./ChatRightSide";
const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <div className="flex bg-[#262a36] max-w-7xl w-full h-[750px] rounded-3xl overflow-hidden ">
        <ChatLeftSide />
        <ChatRightSide />
      </div>
    </div>
  );
};

export default Home;
