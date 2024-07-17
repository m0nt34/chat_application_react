import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: Schema.Types.ObjectId, ref: "users", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Messages = mongoose.model("message", messageSchema, "messages");

export default Messages;
