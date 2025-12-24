import User from "../models/User.js";

export async function createUser({ username: rawUsername, fullname }) {
  try {
    const username = rawUsername.toLowerCase();
    const newUser = new User({ username, fullname });
    await newUser.save()
    return { error: false, data: newUser };
  } catch (error) {
    console.log(error.message, "at createUser")
    if (error.code === 11000) {
      return { error: true, message: "Username Already Taken" };
    }
  }
}
