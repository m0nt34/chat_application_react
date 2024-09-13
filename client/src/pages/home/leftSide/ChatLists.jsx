import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../../../store/userStore";
import { useRoom } from "../../../store/currentRomm";
import usersImg from "../../../assets/images/chatDefault.jpg";
import userImg from "../../../assets/images/user.jpg";
import { useChatSearch } from "../../../store/chatSearch";
const ChatLists = ({ socket }) => {
  const [chats, setChats] = useState([]);
  const { chatSearch } = useChatSearch();
  const isFirstLoad = useRef(true);
  const { user } = useUser();
  const { setRoom } = useRoom();
  const joinRoom = (chat) => {
    socket.emit("join_room", chat._id, (response) => {
      setRoom(chat);
    });
  };

  useEffect(() => {
    if (!user?.chats) return;
    if (chatSearch.trim() === "") {
      setChats(user.chats);
    } else {
      const filteredChats = user.chats.filter(
        (chat) =>
          chat.name.startsWith(chatSearch) || chat.name.includes(chatSearch)
      );
      setChats(filteredChats);
    }
  }, [chatSearch, user?.chats]);
  return (
    <ul className="flex flex-col gap-4 pr-5">
      {chats.map((chat) => {
        return (
          <li
            onClick={() => {
              joinRoom(chat);
            }}
            key={chat._id}
            className="flex gap-5 items-center justify-start w-full rounded-xl bg-[#374151] p-3 cursor-pointer hover:bg-[#313b49] transition"
          >
            <img
              src={chat.private ? userImg : usersImg}
              alt=""
              className="rounded-full h-12"
            />
            <h1 className="text-xl text-white">{chat.name}</h1>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatLists;
