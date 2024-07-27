export const postMessage = async (chat, message) => {
  try {
    const res = await axios.post("http://localhost:3001/post-message", {
      chat, 
      message
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Failed to post message.",
    };
  }
};