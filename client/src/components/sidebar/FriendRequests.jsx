import React, { useState } from "react";
import img from "../../assets/images/lookForFriends.png";
import userImg from "../../assets/images/user.jpg";
import Xmark from "../../assets/icons/Xmark";
import CheckMarkIcon from "../../assets/icons/CheckMarkIcon";
const FriendRequests = ({ setSearch }) => {
  const [requests, setRequests] = useState([
    { name: "saxeli", lastName: "gvari", code: "000001", avatar: "" },
  ]);
  return (
    <div className="flex flex-col h-full">
      <ul className="flex flex-col gap-4 items-center justify-center min-h-full">
        {requests.length ? (
          requests.map((req) => {
            return (
              <li key={req.code} className="flex w-full justify-between bg-[#374151] px-5 py-3 rounded-lg">
                <div className="flex gap-3">
                  <img
                    src={userImg}
                    alt={userImg}
                    className="rounded-full h-12"
                  />
                  <div className="flex flex-col ">
                    <h3 className="text-xl text-white">
                      {req.name} {req.lastName}
                    </h3>
                    <span className="flex text-gray-400 text-base">
                      <p className="select-none">#</p>
                      {req.code}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="flex items-center justify-center">
                    <Xmark className={"text-4xl text-red-600"} />
                  </button>
                  <button className="flex items-center justify-center">
                    <CheckMarkIcon className={"text-4xl text-green-600"} />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-white whitespace-nowrap text-5xl">
              no requests!
            </h1>
            <img src={img} alt="" className="h-3/4" />
            <button
              onClick={() => {
                setSearch(true);
              }}
              className="bg-[rgba(255,255,255,0.08)] text-white text-xl px-5 py-5 rounded-md hover:bg-[rgba(255,255,255,0.05)] whitespace-nowrap transition"
            >
              look for new friends
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default FriendRequests;
