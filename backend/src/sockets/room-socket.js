export default function roomSocket(io, socket) {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("leave_room", (roomId)=>{
    socket.leave(roomId)
  })
}
