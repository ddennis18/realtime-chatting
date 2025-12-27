import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true },
    admins: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Group = mongoose.model("group", groupSchema);

export default Group;
