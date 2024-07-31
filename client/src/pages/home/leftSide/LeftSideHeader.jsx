import React from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import ThreeDots from "../../../assets/icons/ThreeDots";
import PlusIcon from "../../../assets/icons/PlusIcon";
import { useUser } from "../../../store/userStore";
import Input from "../../../components/UI/Input";
import { useChatSearch } from "../../../store/chatSearch";
const LeftSideHeader = ({ userImg }) => {
  const { setChatSearch } = useChatSearch();
  const { user } = useUser();
  const handleChange = (e) => {
    const { value } = e.target;
    setChatSearch(value);
  };
  return (
    <header className="flex flex-col gap-5 w-full ">
      <div className="flex gap-5 items-center justify-between">
        <div className="flex gap-5 items-center">
          <img src={userImg} alt={userImg} className="rounded-full h-12" />
          <h1 className="text-2xl text-white">
            {user.name + " " + user.lastName}
          </h1>
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
  );
};

export default LeftSideHeader;