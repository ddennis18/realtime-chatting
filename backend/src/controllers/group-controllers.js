import {
  checkIsOwner,
  createGroup,
  getGroupById,
  addGroupMembers,
  removeGroupMembers,
  changeGroupOwner,
  deleteGroup,
} from "../services/group-services.js";

export async function createGroupController(req, res, next) {
  try {
    const owner = req.userId;
    const { name } = req.body || {};
    const result = await createGroup({ owner, name, members: [owner] });
    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    const newGroup = result.data;

    res
      .status(201)
      .send({ message: "Group Created Successfully", group: newGroup });
  } catch (error) {
    next(error);
  }
}

export async function getGroupController(req, res, next) {
  try {
    //TODO: owner here will be removed later when user auth is ready
    const { id } = req.params;

    const result = await getGroupById(id);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    res
      .status(201)
      .send({ message: "Group Retreived Successfully", group: result.data });
  } catch (error) {
    next(error);
  }
}

export async function editGroupController(req, res, next) {
  try {
    const userId = req.userId;
    const { id: groupId } = req.params;
    const result = await checkIsOwner(userId, groupId);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    const isOwner = result.data;
    if (!isOwner) {
      return res
        .status(403)
        .send({ message: "Unauthorised User Not the Owner" });
    }

    const { addMembers, removeMembers, changeOwner } = req.body;

    let updatedGroup = null;

    if (addMembers && Array.isArray(addMembers) && addMembers.length > 0) {
      const addRes = await addGroupMembers(addMembers, groupId);
      if (addRes.error) {
        return res.status(400).send({ message: addRes.message });
      }
      updatedGroup = addRes.data;
    }

    if (
      removeMembers &&
      Array.isArray(removeMembers) &&
      removeMembers.length > 0
    ) {
      const remRes = await removeGroupMembers(removeMembers, groupId);
      if (remRes.error) {
        return res.status(400).send({ message: remRes.message });
      }
      updatedGroup = remRes.data;
    }

    if (changeOwner) {
      const ownerRes = await changeGroupOwner(changeOwner, groupId);
      if (ownerRes.error) {
        return res.status(400).send({ message: ownerRes.message });
      }
      updatedGroup = ownerRes.data;
    }

    if (!updatedGroup) {
      // If no changes were requested, return the current group
      const currentGroupRes = await getGroupById(groupId);
      updatedGroup = currentGroupRes.data;
    }

    res
      .status(200)
      .send({ message: "Group Updated Successfully", group: updatedGroup });
  } catch (error) {
    next(error);
  }
}
export async function deleteGroupController(req, res, next) {
  try {
    const userId = req.userId;
    const { id: groupId } = req.params;

    const result = await checkIsOwner(userId, groupId);
    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    const isOwner = result.data;
    if (!isOwner) {
      return res
        .status(403)
        .send({ message: "Unauthorised User Not the Owner" });
    }

    const deleteResult = await deleteGroup(groupId);
    if (deleteResult.error) {
      return res.status(400).send({ message: deleteResult.message });
    }

    res.status(200).send({ message: "Group Deleted Successfully" });
  } catch (error) {
    next(error);
  }
}
