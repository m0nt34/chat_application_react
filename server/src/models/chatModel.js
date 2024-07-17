import mongoose from "mongoose";

const chatShema = new mongoose.Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Chats = mongoose.model("chat", chatShema, "chats");

export default Chats;
