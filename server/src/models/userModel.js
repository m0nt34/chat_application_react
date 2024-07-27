import mongoose from "mongoose";

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
