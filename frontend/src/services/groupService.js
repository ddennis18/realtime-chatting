import api from "./api";

export async function createGroup({ name, accessToken }) {
  try {
    const res = await api.post(
      "/group/new",
      { name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return { ...res.data, ok: true };
  } catch (error) {
    return { ...error.response.data, ok: false };
  }
}
