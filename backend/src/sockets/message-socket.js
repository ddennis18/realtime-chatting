export default function messageSocket(io, socket) {
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", { ...data, id: socket.id });
  });
}
