import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function createUser({
  username: rawUsername,
  fullname,
  password,
}) {
  try {
    const username = rawUsername.toLowerCase();
    const newUser = new User({ username, fullname, password });
    await newUser.save();
    return { error: false, data: newUser };
  } catch (error) {
    console.log(error.message, "at createUser");
    if (error.code === 11000) {
      return { error: true, message: "Username Already Taken" };
    }
    return { error: true, message: error?.message };
  }
}

export async function getUserById(userId, options = { withPassword: false }) {
  try {
    const { withPassword } = options;
    const user = await User.findById(
      userId,
      withPassword ? "" : "-password"
    ).populate("groups");
    if (!user) {
      return { error: true, mesage: "User Doesn't Exist" };
    }
    return { error: false, data: user };
  } catch (error) {
    console.log(error.message, "at getUser");
    return { error: true, message: error?.message };
  }
}

export async function getUserByUsername(
  rawUsername,
  options = { withPassword: false }
) {
  try {
    const { withPassword } = options;
    const username = rawUsername.toLowerCase();
    const user = await User.findOne(
      { username },
      withPassword ? "" : "-password"
    ).populate("groups");
    if (!user) {
      return { error: true, message: "User Doesn't Exist" };
    }
    return { error: false, data: user };
  } catch (error) {
    console.log(error.message, "at getUser");
    return { error: true, message: error?.message };
  }
}

export async function generateRefreshToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function generateAccessToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

export async function searchUsers(query) {
  try {
    if (!query || query.trim().length === 0) {
      return { error: false, data: [] };
    }

    const users = await User.find(
      {
        $or: [
          { username: { $regex: query, $options: "i" } },
          { fullname: { $regex: query, $options: "i" } },
        ],
      },
      "-password"
    ).limit(10);

    return { error: false, data: users };
  } catch (error) {
    console.log("error at searchUsers ", error);
    return { error: true, message: error.message };
  }
}
