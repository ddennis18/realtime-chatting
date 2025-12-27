import Message from "../models/Message.js";
import { isObjectIdOrHexString } from "mongoose";

export async function createMessage({ content, sender, group }) {
  try {
    if (!content || !content.trim()) {
      return { error: true, message: "Message content is required" };
    }

    if (!isObjectIdOrHexString(sender) || !isObjectIdOrHexString(group)) {
      return { error: true, message: "Invalid sender or group ID" };
    }

    const newMessage = new Message({ content, sender, group });
    await newMessage.save();

    const populatedMessage = await Message.findById(newMessage._id).populate(
      "sender",
      "username fullname"
    );

    return { error: false, data: populatedMessage };
  } catch (error) {
    console.log("error at createMessage ", error);
    return { error: true, message: error.message };
  }
}

export async function getMessagesByGroup(groupId, limit = 50) {
  try {
    if (!isObjectIdOrHexString(groupId)) {
      return { error: true, message: "Invalid group ID" };
    }

    const messages = await Message.find({ group: groupId })
      .populate("sender", "username fullname")
      .sort({ createdAt: -1 })
      .limit(limit);

    return { error: false, data: messages.reverse() };
  } catch (error) {
    console.log("error at getMessagesByGroup ", error);
    return { error: true, message: error.message };
  }
}
