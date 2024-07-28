import React, { useState } from "react";
import SidebarArrowLeft from "../../assets/icons/SidebarArrowLeft";
import SidebarArrowRight from "../../assets/icons/SidebarArrowRight";
import InsideCont from "./InsideCont";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen relative">
      <div
        className={`flex flex-col transition-all duration-300 ${
          open ? "w-96 translate-x-0" : "w-0 -translate-x-full"
        } h-full bg-[#262a36] overflow-hidden`}
      >
        <InsideCont />
      </div>
      <div
        className={`flex items-center justify-center min-h-screen w-10 cursor-pointer transition duration-300 absolute hover:bg-[rgba(255,255,255,0.05)]  ${
          open ? "translate-x-96" : "translate-x-0"
        }`}
        onClick={() => setOpen(!open)}
      >
        {open ? <SidebarArrowLeft /> : <SidebarArrowRight />}
      </div>
    </div>
  );
};
export default Sidebar;
