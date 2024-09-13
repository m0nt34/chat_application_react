import React, { useEffect, useState } from "react";
import { useCreateChatPopup } from "../../store/createChatPopup";
import { useUser } from "../../store/userStore";
import userImg from "../../assets/images/user.jpg";
import Xmark from "../../assets/icons/Xmark";
import { createChat } from "../../services/chatServices";
import { showErrorMessage, showSuccessMessage } from "../../utils/validation";
const NewChatPopup = () => {
  const { user } = useUser();
  const { isOpen, setPopupToFalse } = useCreateChatPopup();
  const [chatName, setChatName] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const handleCancel = () => {
    setPopupToFalse();
    setChatName("");
    setSearchedUsers([]);
    setAddedUsers([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currUserObj = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      avatar: user.avatar,
    };
    const res = await createChat(chatName, addedUsers, currUserObj);
    console.log(res);
    if (res.error) {
      showErrorMessage(res.message);
    } else {
      showSuccessMessage("New chat was created successfully");
      setPopupToFalse();
    }
  };
  const checkIfUserAdded = (id) => {
    for (let i = 0; i < addedUsers.length; i++) {
      if (id == addedUsers[i]._id) {
        return false;
      }
    }
    return true;
  };
  const removeUser = (passedUser) => {
    const id = passedUser._id;
    setAddedUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    setSearchedUsers((prev) => [...prev, passedUser]);
  };
  const handleSearch = (searchWord) => {
    const search = searchWord.toLowerCase();

    if (search.length > 0) {
      setSearchedUsers(
        user.friends.filter(
          (user) => user.name.startsWith(search) && checkIfUserAdded(user._id)
        )
      );
    } else {
      setSearchedUsers([]);
    }

    if (search === "all") {
      const currentSearchedUsers = user.friends.filter(({ id }) => {
        return !addedUsers.some((addedUser) => addedUser.id === id);
      });
      setSearchedUsers(currentSearchedUsers);
    }
  };
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55 ">
        <div className="bg-[#262a36] p-5 rounded-lg shadow-lg w-[450px]">
          <h1 className="text-3xl text-white mb-4 select-none">
            Create New Chat
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <div className="flex flex-col gap-4">
              <div className="relative flex items-center bg-gray-700 w-full px-4 py-2 rounded-lg focus-within:border-customColor-blue border-2 border-[#323644]">
                <input
                  placeholder=" "
                  autoComplete="off"
                  className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent text-xl"
                  onChange={(e) => {
                    setChatName(e.target.value);
                  }}
                  value={chatName}
                />
                <span className="absolute left-4 -translate-y-1/2 text-xs text-gray-400 pointer-events-none top-1/2 peer-placeholder-shown:text-base opacity-0 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 ">
                  chat name
                </span>
              </div>
              <div className="relative flex items-center bg-gray-700 w-full px-4 py-2 rounded-lg focus-within:border-customColor-blue border-2 border-[#323644]">
                <input
                  placeholder=" "
                  autoComplete="off"
                  className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent text-xl"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
                <span className="absolute left-4 -translate-y-1/2 text-xs text-gray-400 pointer-events-none top-1/2 peer-placeholder-shown:text-base opacity-0 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 ">
                  search members
                </span>
              </div>
              {addedUsers.length !== 0 && (
                <ul className="flex flex-wrap w-full gap-2">
                  {addedUsers.map((addedUser, i) => {
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-center gap-1 bg-customColor-blue text-white w-fit rounded-full px-3 py-1 cursor-pointer hover:opacity-85 transition"
                      >
                        <p>{addedUser.name}</p>
                        <button
                          type="button"
                          onClick={() => removeUser(addedUser)}
                        >
                          <Xmark />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {searchedUsers.length !== 0 && (
              <ul className="flex flex-col gap-3 mt-5">
                {searchedUsers.map((searchUser, i) => {
                  return (
                    <li
                      key={i}
                      className="flex w-full items-center justify-between bg-[#374151] px-5 py-3 rounded-lg hover:bg-[#404a5c] transition cursor-pointer"
                      onClick={() => {
                        setAddedUsers([...addedUsers, searchUser]);
                        setSearchedUsers((prevUsers) =>
                          prevUsers.filter(
                            (user) => user._id !== searchUser._id
                          )
                        );
                      }}
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={userImg}
                          alt=""
                          className="rounded-full h-12"
                        />

                        <h3 className="text-xl text-white">
                          {searchUser.name} {searchUser.lastName}
                        </h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="flex gap-3 mt-5">
              <button
                type="submit"
                className="bg-customColor-blue hover:opacity-85 transition text-white px-4 py-2 text-lg rounded-md w-full"
              >
                Create
              </button>
              <button
                onClick={handleCancel}
                className=" text-white hover:opacity-85 transition bg-[rgba(255,255,255,0.1)] px-4 py-2 text-lg rounded-md w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default NewChatPopup;
