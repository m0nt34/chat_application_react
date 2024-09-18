import React, { useEffect, useRef, useState } from "react";
import { useChatSettingsPopup } from "../../../store/chatSettingsPopup";
import { useRoom } from "../../../store/currentRomm";
import AvatarImg from "../AvatarImg";
import { handleUpdate } from "../../../utils/handleUpdate";
import UserList from "./UserList";
import { getChatByID } from "../../../services/chatServices";
const ChatSettingPopup = () => {
  const { isOpen, setPopupToFalse } = useChatSettingsPopup();
  const { room } = useRoom();
  const originalName = useRef("");
  const [currentRoom, setCurrentRoom] = useState({
    _id: null,
    name: "",
    participants: [],
    admins: [],
    private: true,
  });

  const handleTextName = (e) => {
    setCurrentRoom((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  useEffect(() => {
    setCurrentRoom((prev) => ({
      ...prev,
      name: room.name,
    }));
    originalName.current = room.name;
    const getChatFunc = async () => {
      if (!room._id) return;
      const res = await getChatByID(room._id);
      if (!res.error) {
        setCurrentRoom(res.data);
      }
    };
    getChatFunc();
  }, [room]);
  const hu = () => {
    handleUpdate(room._id,originalName.current, currentRoom);
  };
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55 ">
        <div className="flex flex-col bg-[#262a36] p-5 rounded-lg shadow-lg w-[500px]">
          <header className="flex items-center text-[40px] gap-5 text-white select-none">
            <AvatarImg prv={currentRoom.private} className="h-12" />
            Update Chat
          </header>
          <div className="relative flex items-center bg-gray-700 w-full px-5 py pt-4 pb-2 mt-5 rounded-lg focus-within:border-customColor-blue border-2 border-[#323644]">
            <input
              type="text"
              onChange={handleTextName}
              value={currentRoom.name}
              placeholder=" "
              autoComplete="off"
              className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent text-base"
            />
            <span className="absolute left-5 -translate-y-1/2 top-[10px] text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-[10px] peer-focus:text-customColor-blue peer-focus:text-xs">
              enter new group name...
            </span>
          </div>
          <UserList currentRoom={currentRoom} />

          <div className="flex w-full gap-4 mt-6">
            <button
              type="button"
              onClick={setPopupToFalse}
              className=" text-white hover:opacity-85 transition bg-[rgba(255,255,255,0.1)] px-4 py-2 text-lg rounded-md w-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => hu()}
              className="bg-customColor-blue hover:opacity-85 transition text-white px-4 py-2 text-lg rounded-md w-full"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatSettingPopup;
