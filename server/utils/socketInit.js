const map = new Map(); // userId => socketId
const revMap = new Map(); // socketId => userId
const socketInit = (io) => {
  io.on("connection", (socket) => {
    console.log("New socket connectd:", socket.id);

    socket.on("register", (userId) => {
      map.set(userId, socket.id);
      revMap.set(socket.id, userId);

      console.log(map);
    });

    socket.on("register - admin", () => {
      socket.join("admins");
    });

    socket.on("New Service Booked - to server", (ticket) => {
      io.to("admins").emit("New Service Booked - to admin", ticket);
    });

    socket.on("Service Cancelled - to server", (ticket) => {
      io.to("admins").emit("Service Cancelled - to admin", ticket);
    });

    socket.on("Worker Assigned - to server", (ticket) => {
      console.log(
        "Received worker assigned event from admins with ticket:",
        ticket
      );
      const clientId = map.get(ticket.customer.id);
      const workerId = map.get(ticket.worker.id);
      io.to(clientId).emit("Worker Assigned - to client", ticket);
      io.to(workerId).emit("Worker Assigned - to client (worker)", ticket);
      console.log("WorkerId:", workerId, "\nClientId:", clientId);
    });

    socket.on("Service Completed - to server", (ticket) => {
      io.to("admins").emit("Service Completed - to admin", ticket);
      io.to(map.get(ticket.customer.id)).emit(
        "Service Completed - to client",
        ticket
      );
    });

    socket.on("disconnect", () => {
      const userId = revMap.get(socket.id);
      map.delete(userId);
      revMap.delete(socket.id);
    });
  });
};

export default socketInit;
