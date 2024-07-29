import mongoose from "mongoose";

const friendReqSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  friendRequests: {
    type: [friendReqSchema],
    default: [],
  }, 
  chats: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "chats",
    default: [],
  },
  code: {
    type: String,
    unique: true,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "",
  },
}, { versionKey: false });

const Users = mongoose.model("user", userSchema, "users");

export default Users;
