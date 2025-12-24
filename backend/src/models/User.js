import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    groups: [{ type: mongoose.SchemaTypes.ObjectId, ref: "group" }],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
