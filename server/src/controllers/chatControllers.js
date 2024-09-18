import Chats from "../models/chatModel.js";
import Users from "../models/userModel.js";

export default {
  postMessage: async (req, res) => {
    try {
      const { message } = req.body;

      if (!message.content) {
        return res.status(400).json({
          error: true,
          message: "Can't send message without content",
        });
      }

      const chatDoc = await Chats.findById(message.room);
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
          String(new Date(Date.now()).getHours()).padStart(2, "0") +
          ":" +
          String(new Date(Date.now()).getMinutes()).padStart(2, "0"),
      };

      chatDoc.messages.push(messageObj);

      await chatDoc.save();

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
  getMessages: async (req, res) => {
    try {
      const { chatId } = req.query;

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
      const { name, userIDs, myObj } = req.body;

      if (name.length < 3) {
        return res.status(400).json({
          error: true,
          message: "chat name should be longer",
        });
      }
      if (name.length > 20) {
        return res.status(400).json({
          error: true,
          message: "chat name should be shorter",
        });
      }

      if (userIDs.length < 2) {
        return res.status(400).json({
          error: true,
          message: "To create chat you need at least 2 other users",
        });
      }
      const allParticipants = [...userIDs, myObj];

      const chatObj = {
        name: name,
        participants: allParticipants,
        admins: [myObj._id],
        private: false,
      };
      const newChat = await new Chats(chatObj).save();

      // const createdChatObj = {
      //   _id: newChat._id,
      //   name,
      //   admins: [myObj._id],
      //   private: false,
      // };
      const userUpdatePromises = allParticipants.map((userID) =>
        Users.findByIdAndUpdate(
          userID,
          { $push: { chats: newChat._id } },
          { new: true }
        )
      );

      await Promise.all(userUpdatePromises);

      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  searchUsers: async (req, res) => {
    try {
      const searchCode = req.query.searchCode;
      const currUser = req.query.currUser;
      if (!searchCode || searchCode.length < 4 || searchCode.length > 6) {
        return res.status(400).json({
          error: true,
          message: "search word is required",
        });
      }

      const foundData = await Users.find({
        code: {
          $regex: searchCode,
          $options: "i",
          $ne: currUser,
        },
      });

      return res.status(200).json({
        error: false,
        data: foundData,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  sendRequest: async (req, res) => {
    try {
      const { myID, user } = req.body;
      if (!myID || !user) {
        return res.status(400).json({
          error: true,
          message: "User codes are required",
        });
      }

      const findUser = await Users.findOne({ code: user });
      if (!findUser) {
        return res.status(404).json({
          error: true,
          message: "No user was found",
        });
      }
      const findCurrUser = await Users.findById(myID);
      if (!findCurrUser) {
        return res.status(404).json({
          error: true,
          message: "No user was found",
        });
      }

      if (!Array.isArray(findUser.friendRequests)) {
        findUser.friendRequests = [];
      }

      let isAlreadyRequested = false;

      for (let i = 0; i < findUser.friendRequests.length; i++) {
        if (
          findUser.friendRequests[i]._id.toString() ===
          findCurrUser._id.toString()
        ) {
          isAlreadyRequested = true;
          break;
        }
      }

      if (isAlreadyRequested) {
        return res.status(400).json({
          error: true,
          message: "You are already in friend requests",
        });
      }

      isAlreadyRequested = false;

      for (let i = 0; i < findCurrUser.friendRequests.length; i++) {
        if (
          findCurrUser.friendRequests[i]._id.toString() ===
          findUser._id.toString()
        ) {
          isAlreadyRequested = true;
          break;
        }
      }

      if (isAlreadyRequested) {
        return res.status(400).json({
          error: true,
          message: "Your friend already sent you request",
        });
      }
      let isAlreadyFriend = false;

      for (let i = 0; i < findCurrUser.friends.length; i++) {
        if (
          findCurrUser.friends[i]._id.toString() === findUser._id.toString()
        ) {
          isAlreadyFriend = true;
          break;
        }
      }

      if (isAlreadyFriend) {
        return res.status(400).json({
          error: true,
          message: "This user is already your friend",
        });
      }

      const reqUser = {
        _id: findCurrUser._id,
        name: findCurrUser.name,
        lastName: findCurrUser.lastName,
        avatar: findCurrUser.avatar,
        code: findCurrUser.code,
      };

      findUser.friendRequests.push(reqUser);

      await findUser.save();

      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      console.log("Error in sendRequest function:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  declineRequests: async (req, res) => {
    try {
      const { myID, userID } = req.body;

      if (!myID || !userID) {
        return res.status(400).json({
          error: true,
          message: "User codes are required",
        });
      }

      const findCurrUser = await Users.findById(myID);
      if (!findCurrUser) {
        return res.status(404).json({
          error: true,
          message: "No user was found",
        });
      }

      const updatedFriendRequests = findCurrUser.friendRequests.filter(
        (req) => req._id.toString() !== userID
      );

      findCurrUser.friendRequests = updatedFriendRequests;

      await findCurrUser.save();

      return res.status(200).json({
        error: false,
      });
    } catch (error) {
      console.log("Error in sendRequest function:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  acceptRequests: async (req, res) => {
    try {
      const { myID, userID } = req.body;
      if (!myID || !userID) {
        return res.status(400).json({
          error: true,
          message: "User codes are required",
        });
      }

      const findUser = await Users.findById(userID);
      if (!findUser) {
        return res.status(404).json({
          error: true,
          message: "No user was found",
        });
      }

      const findCurrUser = await Users.findById(myID);
      if (!findCurrUser) {
        return res.status(404).json({
          error: true,
          message: "No user was found",
        });
      }

      const updatedFriendRequests = findCurrUser.friendRequests.filter(
        (req) => req._id.toString() !== userID
      );
      findCurrUser.friendRequests = updatedFriendRequests;

      const myObj = {
        _id: findCurrUser._id,
        name: findCurrUser.name,
        lastName: findCurrUser.lastName,
        avatar: findCurrUser.avatar,
      };
      const friendsObj = {
        _id: findUser._id,
        name: findUser.name,
        lastName: findUser.lastName,
        avatar: findUser.avatar,
      };

      const privateChatObj = {
        name: findCurrUser.name + "," + findUser.name,
        participants: [findCurrUser._id, findUser._id],
        admins: [findCurrUser._id, findUser._id],
        private: true,
      };

      const newPrivateChat = await new Chats(privateChatObj).save();

      findCurrUser.chats.push(newPrivateChat._id);
      findUser.chats.push(newPrivateChat._id);

      findUser.friends.push(myObj);
      findCurrUser.friends.push(friendsObj);

      await findUser.save();
      await findCurrUser.save();

      return res.status(200).json({
        error: false,
        message: "Friend request accepted successfully",
      });
    } catch (error) {
      console.log("Error in acceptRequests function:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },

  getChat: async (req, res) => {
    try {
      const { chatID } = req.query;

      const currentChat = await Chats.findById(chatID).select(
        "name participants admins private"
      );
      if (!currentChat) {
        return res.status(404).json({
          error: true,
          message: "chat not found",
        });
      }

      const neededFields = await currentChat.populate({
        path: "participants admins",
        select: "name lastName email",
      });

      return res.status(200).json({
        error: false,
        data: neededFields,
      });
    } catch (error) {
      console.log("Error in sendRequest function:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
  updateChat: async (req, res) => {
    try {
      const { ID, newChat } = req.body;

      if (!newChat) {
        return res.status(400).json({
          error: true,
          message: "updated chat is not provided",
        });
      }
      const currentChat = await Chats.findById(ID);
      if (!currentChat) {
        return res.status(404).json({
          error: true,
          message: "chat not found",
        });
      }
      const updatedChat = await Chats.findByIdAndUpdate(
        ID,
        { $set: newChat },
        { new: true }
      );

      return res.status(200).json({
        error: false,
        message: "Chat has been updated successfully",
        data: updatedChat,
      });
    } catch (error) {
      console.log("Error in sendRequest function:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details: error.message,
      });
    }
  },
};
