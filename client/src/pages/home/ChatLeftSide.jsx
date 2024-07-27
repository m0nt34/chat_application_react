import React, { useEffect, useState } from "react";
import userImg from "../../assets/images/user.jpg";
import Input from "../../components/UI/Input";
import SearchIcon from "../../assets/icons/SearchIcon";
import ThreeDots from "../../assets/icons/ThreeDots";
import PlusIcon from "../../assets/icons/PlusIcon";
import { useUser } from "../../store/userStore";
import "../../assets/styles/style.css";
const ChatLeftSide = ({ socket }) => {
  const [data, setFormData] = useState({});
  const { user } = useUser();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...data,
      [name]: value,
    });
  };

  const joinRoom = () => {
    socket.emit("join_room", 123, (response) => {});
  };

  useEffect(() => {
    joinRoom();
    return () => {
      socket.emit("leave_room", 123);
    };
  }, []);
  return (
    <div className="flex flex-col gap-5 h-full w-1/3 bg-[#1d212b] p-5">
      <header className="flex flex-col gap-5 w-full ">
        <div className="flex gap-5 items-center justify-between">
          <div className="flex gap-5 items-center">
            <img src={userImg} alt={userImg} className="rounded-full h-12" />
            <h1 className="text-2xl text-white">{user.name+" "+user.lastName}</h1>
          </div>
          <button className="cursor-pointer">
            <ThreeDots />
          </button>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <Input
            name="search"
            type="text"
            placeholder="Search..."
            Icon={SearchIcon}
            onChange={handleChange}
          />
          <button className="flex items-center justify-center text-5xl text-white bg-[#374151] rounded-lg h-full aspect-square hover:opacity-85 transition">
            <PlusIcon />
          </button>
        </div>
      </header>
      <div className="users-box">
        <ul className="flex flex-col gap-4 pr-5">
          <li className="flex gap-5 items-center justify-start w-full rounded-xl bg-[#374151] p-3 cursor-pointer hover:bg-[#313b49] transition">
            <img src={userImg} alt={userImg} className="rounded-full h-12" />
            <h1 className="text-xl text-white">name surename</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatLeftSide;
