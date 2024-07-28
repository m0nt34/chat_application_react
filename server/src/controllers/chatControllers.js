import Chats from "../models/chatModel.js";

export default {
  postMessage: async (req, res) => {
    try {
      const { chat, message } = req.body;

      if (!message.content) {
        return res.status(400).json({
          error: true,
          message: "Can't send message without content",
        });
      }

      const chatDoc = await Chats.findById(chat);
      if (!chatDoc) {
        return res.status(404).json({
          error: true,
          message: "Chat not found",
        });
      }

      const messageObj = {
        sender: message.sender,
        content: message.content,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      chatDoc.messages.push(messageObj);

      await chatDoc.save();

      return res.status(200).json({
        error: false,
        data: chatDoc,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  getMessages: async (req, res) => {
    try {
      const { chatId } = req.params;

      const chatDoc = await Chats.findById(chatId);
      if (!chatDoc) {
        return res.status(404).json({
          error: true,
          message: "Chat not found",
        });
      }

      return res.status(200).json({
        error: false,
        data: chatDoc.messages,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  createChat: async (req, res) => {
    try {
      const { userIDs, privateChat, chatImg } = req.body;
      if (!userIDs) {
        return res.status(400).json({
          error: true,
          message: "to create chat participants are required",
        });
      }
      const chatObj = {
        participants: [userIDs],
        admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
        private: privateChat,
        chatImg: chatImg,
      };
      await new Chats(chatObj).save();
      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};
