import React, { useRef, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import userImg from "../../assets/images/user.jpg";
import Input from "../UI/Input";
import { searchUsers, sendRequest } from "../../services/chatServices";
import { useUser } from "../../store/userStore";
import { showErrorMessage } from "../../utils/validation";
const SearchFriends = () => {
  const { user } = useUser();
  const [searchedData, setSearchedData] = useState([]);
  const timer = useRef(null);
  const handleChange = (e) => {
    const { value } = e.target;
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (value.length > 4 && value.length < 7) {
      timer.current = setTimeout(async () => {
        const res = await searchUsers(value, user.code);

        if (res.error) {
          showErrorMessage(res.message);
        } else {
          setSearchedData(res.data);
        }
      }, 500);
    }
    if (value.length === 0) {
      setSearchedData([]);
    }
  };
  const handleRequest = async (code) => {
    const res = await sendRequest(user._id, code);
    if (res.error) {
      showErrorMessage(res.message);
    }
  };
  return (
    <div className="flex flex-col gap-5 w-full min-h-full">
      <Input
        name="search"
        type="text"
        placeholder="Enter user code..."
        Icon={SearchIcon}
        onChange={handleChange}
      />
      <ul className="flex flex-col min-h-full gap-4">
        {searchedData.map((data) => {
          return (
            <li
              key={data.code}
              className="flex w-full justify-between bg-[#374151] px-5 py-3 rounded-lg"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={userImg}
                  alt={userImg}
                  className="rounded-full h-12"
                />
                <div className="flex flex-col ">
                  <h3 className="text-sm text-white">
                    {data.name} {data.lastName}
                  </h3>
                  <span className="flex text-gray-400 text-base">
                    <p className="select-none">#</p>
                    {data.code}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 h-full">
                <button
                  onClick={() => handleRequest(data.code)}
                  className="flex items-center justify-center text-xs bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] transition px-3 py-2 h-fit text-white rounded-md"
                >
                  Add Friend
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchFriends;
