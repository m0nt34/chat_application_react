import React, { useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import userImg from "../../assets/images/user.jpg";
import Input from "../UI/Input";
const SearchFriends = () => {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([
    { name: "saxeli", lastName: "gvari", code: "000001", avatar: "" },
  ]);
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    console.log(search);
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
              <div className="flex gap-3">
                <img
                  src={userImg}
                  alt={userImg}
                  className="rounded-full h-12"
                />
                <div className="flex flex-col ">
                  <h3 className="text-xl text-white">
                    {data.name} {data.lastName}
                  </h3>
                  <span className="flex text-gray-400 text-base">
                    <p className="select-none">#</p>
                    {data.code}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 h-full">
                <button className="flex items-center justify-center bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] transition px-4 py-2 h-fit text-white rounded-md">
                  send request
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
