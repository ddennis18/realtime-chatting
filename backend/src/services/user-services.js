import User from "../models/User.js";

export async function createUser({ username: rawUsername, fullname }) {
  try {
    const username = rawUsername.toLowerCase();
    const newUser = new User({ username, fullname });
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
export async function getUser({ username: rawUsername }) {
  try {
    const username = rawUsername.toLowerCase();
    const user = await User.findOne({ username }).populate('groups');
    if (!user) {
      return { error: false, data: null };
    }
    return { error: false, data: user };
  } catch (error) {
    console.log(error.message, "at getUser");
    return { error: true, message: error?.message };
  }
}
