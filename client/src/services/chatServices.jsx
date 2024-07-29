import axios from "axios";

export const postMessage = async (chat, message) => {
  try {
    const res = await axios.post("http://localhost:3001/post-message", {
      chat,
      message,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to post message.",
    };
  }
};
export const createPrivateChat = async (userIDs, chatImg) => {
  try {
    const res = await axios.post("http://localhost:3001/create-chat", {
      userIDs,
      privateChat: true,
      chatImg,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to post message.",
    };
  }
};
export const createChat = async (userIDs, chatImg) => {
  try {
    const res = await axios.post("http://localhost:3001/create-chat", {
      userIDs,
      privateChat: false,
      chatImg,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to post message.",
    };
  }
};
export const searchUsers = async (searchWord, currUser) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/search-users?searchCode=${searchWord}&currUser=${currUser}`
    );
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to search users.",
    };
  }
};
export const sendRequest = async (myID, user) => {
  try {
    const res = await axios.post(`http://localhost:3001/send-request`, {
      myID,
      user,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message || "Failed to send friend request.",
    };
  }
};
export const declineRequest = async (myID, userID) => {
  try {
    const res = await axios.post(`http://localhost:3001/decline-request`, {
      myID,
      userID,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to decline request.",
    };
  }
};
export const acceptRequest = async (myID, userID) => {
  try {
    const res = await axios.post(`http://localhost:3001/accept-request`, {
      myID,
      userID,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to accept request.",
    };
  }
};
