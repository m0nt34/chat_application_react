import React, { useEffect, useState } from "react";
import { useChatSettingsPopup } from "../../store/chatSettingsPopup";
import { useRoom } from "../../store/currentRomm";
import { getChatByID } from "../../services/chatServices";
import AvatarImg from "./AvatarImg";
import Input from "../../components/UI/Input";
import SearchIcon from "../../assets/icons/SearchIcon";
import { useUser } from "../../store/userStore";
const ChatSettingPopup = () => {
  const { isOpen, setPopupToFalse } = useChatSettingsPopup();
  const { room } = useRoom();
  const { user } = useUser();
  const [roomPrts, setRoomPrts] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    _id: null,
    name: "",
    participants: [],
    admins: [],
    private: true,
  });
  const handleSearch = (e) => {
    const searchWord = e.target.value;
    if (searchWord.trim() === "") {
      setRoomPrts(currentRoom.participants);
    } else {
      setRoomPrts((prev) => {
        return currentRoom.participants.filter(
          (prt) =>
            String(prt.name+" "+prt.lastName).startsWith(searchWord.trim())||
            String(prt.name+" "+prt.lastName).includes(searchWord.trim())||
            prt.email.startsWith(searchWord.trim()) ||
            prt.email.includes(searchWord.trim())
        );
      });
    }
  };
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
    const getChatFunc = async () => {
      const res = await getChatByID(room._id);
      if (!res.error) {
        setCurrentRoom(res.data);
        setRoomPrts(res.data.participants);
      }
    };
    getChatFunc();
  }, [room]);
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
          <div className="my-5">
            <p className="text-white text-lg select-none my-1 ml-1">Members</p>
            <Input
              name="searchWord"
              type="text"
              placeholder="search..."
              Icon={SearchIcon}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col max-h-[400px] overflow-auto h-fit gap-5 users-box">
            {roomPrts.map((prt) => {
              return (
                <div key={prt.email} className="flex items-center">
                  <div className="flex gap-4 items-center">
                    <AvatarImg prv={true} className="h-11" />
                    <div className="flex flex-col">
                      <span className="flex text-white text-[19px] h-full items-start ">
                        {prt.name}&nbsp;{prt.lastName}{" "}
                        {prt._id === user._id && (
                          <div className="flex text-sm ml-2 p-2 py-1 rounded-md bg-[#3c404b]">
                            You
                          </div>
                        )}
                      </span>
                      <span className="text-[#ccc]">{prt.email}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex w-full gap-4 mt-6">
            <button
              type="button"
              onClick={setPopupToFalse}
              className=" text-white hover:opacity-85 transition bg-[rgba(255,255,255,0.1)] px-4 py-2 text-lg rounded-md w-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-customColor-blue hover:opacity-85 transition text-white px-4 py-2 text-lg rounded-md w-full"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatSettingPopup;
