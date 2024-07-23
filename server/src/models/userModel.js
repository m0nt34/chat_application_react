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
  code: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
    default: "",
  },
});

const Users = mongoose.model("user", userSchema, "users");

export default Users;
