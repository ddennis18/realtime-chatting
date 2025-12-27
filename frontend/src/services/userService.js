import api from "./api";

export async function registerUser({ username, fullname, password }) {
  try {
    const res = await api.post("/user/new", { username, fullname, password });
    return { ...res.data, ok: true };
  } catch (error) {
    return { ...error.response.data, ok: false };
  }
}

export async function loginUser({ username, password }) {
  try {
    const res = await api.post("/user/login", { username, password });
    return { ...res.data, ok: true };
  } catch (error) {
    return { ...error.response.data, ok: false };
  }
}

export async function logoutUser() {
  try {
    const res = await api.post("/user/logout");
    return { ...res.data, ok: true };
  } catch (error) {
    return { ...error.response.data, ok: false };
  }
}

export async function refreshToken() {
  try {
    const res = await api.get("/user/refresh");
    return { ...res.data, ok: true };
  } catch (error) {
    return { ...error.response.data, ok: false };
  }
}

export async function searchUsers({ query, accessToken }) {
  try {
    const res = await api.get(`/user/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { ...res.data, ok: true };
  } catch (error) {
    return { ...error.response.data, ok: false };
  }
}
