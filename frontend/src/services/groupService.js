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

export async function addMembersToGroup({ groupId, memberIds, accessToken }) {
  try {
    const res = await api.post(
      `/group/edit/${groupId}`,
      { addMembers: memberIds },
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
