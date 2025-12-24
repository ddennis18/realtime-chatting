import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    group: { type: mongoose.SchemaTypes.ObjectId, ref: "group" },
    deliveredTo: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("group", messageSchema);

export default Message;
