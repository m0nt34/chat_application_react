import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  content: { type: String, required: true },
  time: { type: String },
});

const chatShema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  private: { type: Boolean, default: false },
  chatImg: { type: String, default: "" },
  messages: [messageSchema],
});

const Chats = mongoose.model("chat", chatShema, "chats");

export default Chats;
