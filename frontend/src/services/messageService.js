import api from "./api";

export async function getGroupMessages({ groupId, accessToken, limit = 50 }) {
  try {
    const res = await api.get(`/message/${groupId}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { ...res.data, ok: true };
  } catch (error) {
    return { ...error.response.data, ok: false };
  }
}
