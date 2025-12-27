import { getMessagesByGroup } from "../services/message-services.js";

export async function getGroupMessagesController(req, res, next) {
  try {
    const { groupId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const result = await getMessagesByGroup(groupId, limit);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    res.status(200).send({
      message: "Messages retrieved successfully",
      messages: result.data,
    });
  } catch (error) {
    next(error);
  }
}
