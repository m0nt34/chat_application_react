import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatShema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  private: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  chatImg: { type: String, default: "" },
  messages: [messageSchema],
});

const Chats = mongoose.model("chat", chatShema, "chats");

export default Chats;
