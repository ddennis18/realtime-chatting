import { createMessage } from "../services/message-services.js";

export default function messageSocket(io, socket) {
  socket.on("send_message", async (data) => {
    const { content, room, sender } = data;

    const result = await createMessage({
      content,
      sender,
      group: room,
    });

    if (result.error) {
      socket.emit("message_error", { message: result.message });
      return;
    }

    const savedMessage = result.data;
    io.to(room).emit("receive_message", savedMessage);
  });
}
