import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: { type: String, required: true },
    time: { type: String },
  },
  { versionKey: false, _id: false }
);

const chatShema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    private: { type: Boolean, default: false },
    chatImg: { type: String, default: "" },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  { versionKey: false }
);

const Chats = mongoose.model("chat", chatShema, "chats");

export default Chats;
