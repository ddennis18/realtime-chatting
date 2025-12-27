import { isObjectIdOrHexString, startSession } from "mongoose";
import Group from "../models/Group.js";
import User from "../models/User.js";
import { getUserById } from "./user-services.js";

export async function createGroup({ owner, name, members }) {
  try {
    const newGroup = new Group({ owner, name, members, admins: [owner] });
    await newGroup.save();

    await User.updateMany(
      { _id: { $in: members } },
      { $addToSet: { groups: newGroup._id } }
    );

    return { error: false, data: newGroup };
  } catch (error) {
    console.log("error at createGroup ", error);
    return { error: true, message: error.message };
  }
}

export async function getGroupById(id) {
  try {
    if (!isObjectIdOrHexString(id)) {
      return { error: true, message: "Invalid GroupID" };
    }
    const group = await Group.findOne({ _id: id }).populate([
      "members",
      "admins",
      "owner",
    ]);
    if (!group) {
      return { error: true, mesage: "Group Doesn't Exist" };
    }
    return { error: false, data: group };
  } catch (error) {
    console.log("error at getGroup ", error.message);
    return { error: true, message: error.message };
  }
}

export async function getGroupOwner(groupId) {
  try {
    if (!isObjectIdOrHexString(groupId)) {
      return { error: true, message: "Invalid ID" };
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return { error: false, message: "Group Doesn't Exist" };
    }

    return { error: false, data: group.owner };
  } catch (error) {
    console.log("error at getGroupOwner ", error.message);
    return { error: true, message: error.message };
  }
}

export async function checkIsOwner(userId, groupId) {
  try {
    if (!isObjectIdOrHexString(userId) || !isObjectIdOrHexString(groupId)) {
      return { error: true, message: "Invalid ID" };
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return { error: false, message: "Group Doesn't Exist" };
    }

    return { error: false, data: group.owner == userId };
  } catch (error) {
    console.log("error at isOwner ", error.message);
    return { error: true, message: error.message };
  }
}

export async function addGroupMembers(members, groupId) {
  try {
    if (!isObjectIdOrHexString(groupId)) {
      throw new Error("Invalid ID");
    }

    const validMembers = [];
    for (const m of members) {
      if (isObjectIdOrHexString(m)) {
        const result = await getUserById(m);
        if (!result.error) {
          validMembers.push(m);
        }
      }
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error("Group Doesn't Exist");
    }

    const membersToAdd = [];
    validMembers.forEach((m) => {
      if (!group.members.includes(m)) {
        group.members.push(m);
        membersToAdd.push(m);
      }
    });

    await group.save();

    if (membersToAdd.length > 0) {
      await User.updateMany(
        { _id: { $in: membersToAdd } },
        { $addToSet: { groups: groupId } }
      );
    }

    return { error: false, data: group };
  } catch (error) {
    console.log("error at addGroupMembers ", error.message);
    return { error: true, message: error.message };
  }
}

export async function removeGroupMembers(members, groupId) {
  try {
    if (!isObjectIdOrHexString(groupId)) {
      throw new Error("Invalid ID");
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error("Group Doesn't Exist");
    }

    members.forEach((m) => {
      group.members.pull(m);
    });

    await group.save();

    if (members.length > 0) {
      await User.updateMany(
        { _id: { $in: members } },
        { $pull: { groups: groupId } }
      );
    }

    return { error: false, data: group };
  } catch (error) {
    console.log("error at removeGroupMembers ", error.message);
    return { error: true, message: error.message };
  }
}

export async function changeGroupOwner(newOwnerId, groupId) {
  try {
    if (!isObjectIdOrHexString(groupId) || !isObjectIdOrHexString(newOwnerId)) {
      throw new Error("Invalid ID");
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error("Group Doesn't Exist");
    }

    const userResult = await getUserById(newOwnerId);
    if (userResult.error) {
      throw new Error("New Owner User Doesn't Exist");
    }

    const wasNewOwnerMember = group.members.includes(newOwnerId);

    group.owner = newOwnerId;

    if (!wasNewOwnerMember) {
      group.members.push(newOwnerId);
    }
    if (!group.admins.includes(newOwnerId)) {
      group.admins.push(newOwnerId);
    }

    await group.save();

    if (!wasNewOwnerMember) {
      await User.updateOne(
        { _id: newOwnerId },
        { $addToSet: { groups: groupId } }
      );
    }

    return { error: false, data: group };
  } catch (error) {
    console.log("error at changeGroupOwner ", error.message);
    return { error: true, message: error.message };
  }
}

export async function deleteGroup(groupId) {
  const session = await startSession();
  session.startTransaction();
  try {
    if (!isObjectIdOrHexString(groupId)) {
      throw new Error("Invalid ID");
    }

    const group = await Group.findById(groupId).session(session);
    if (!group) {
      throw new Error("Group Doesn't Exist");
    }

    await Group.deleteOne({ _id: groupId }).session(session);

    await User.updateMany(
      { groups: groupId },
      { $pull: { groups: groupId } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();
    return { error: false, message: "Group deleted successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("error at deleteGroup ", error.message);
    return { error: true, message: error.message };
  }
}
