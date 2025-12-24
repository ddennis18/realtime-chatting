import api from "./api";

export async function registerUser({ username, fullname }) {
  try {
    const res = await api.post("/user/new", { username, fullname });
    return res.data.user;
  } catch (error) {
    return null;
  }
}

export async function loginUser({ username }) {
  try {
    const res = await api.post("/user/me", { username });
    return res.data.user;
  } catch (error) {
    return null;
  }
}
