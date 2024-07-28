import React, { useState } from "react";
import FriendRequests from "./FriendRequests";
import SearchFriends from "./SearchFriends";
const InsideCont = () => {
  const [search, setSearch] = useState(false);
  return (
    <div className="flex flex-col gap-5 px-5 pt-5">
      <div className="flex w-full gap-3">
        <button
          onClick={() => setSearch(false)}
          className={`text-white whitespace-nowrap w-2/4 py-4 text-xl font-bold rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition ${
            !search ? "bg-[rgba(255,255,255,0.08)]" : null
          }`}
        >
          friend requests
        </button>
        <button
          onClick={() => setSearch(true)}
          className={`text-white whitespace-nowrap w-2/4 py-4 text-xl font-bold rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition ${
            search ? "bg-[rgba(255,255,255,0.08)]" : null
          }`}
        >
          search friends
        </button>
      </div>
      {search ? <SearchFriends /> : <FriendRequests setSearch={setSearch}/>}
    </div>
  );
};

export default InsideCont;
