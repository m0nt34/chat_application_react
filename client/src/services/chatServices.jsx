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
