import axios from "axios";

export const postMessage = async (message) => {
  try {
    const res = await axios.post("http://localhost:3001/post-message", {
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
export const getMessages = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/get-messages?chatId=${id}`
    );
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to get messages.",
    };
  }
};

export const createChat = async (name, userIDs, myObj) => {
  try {
    const res = await axios.post("http://localhost:3001/create-chat", {
      name,
      userIDs,
      myObj,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to create chat.",
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
export const getChatByID = async (roomID) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/get-chat?chatID=${roomID}`
    );
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed get chat.",
    };
  }
};
