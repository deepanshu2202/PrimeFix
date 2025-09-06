import jwt from "jsonwebtoken";
import cookie from "cookie";

const map = new Map(); // userId => socketId
const revMap = new Map(); // socketId => userId

const socketInit = (io) => {
  io.on("connection", (socket) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;
    const adminToken = cookies.adminToken;

    // Disconnect immediately if no token
    if (!token && !adminToken) return socket.disconnect();

    let userId;
    try {
      if (token) {
        userId = jwt.verify(token, process.env.JWT_SECRET).id;
      }
      if (adminToken) {
        userId = jwt.verify(adminToken, process.env.JWT_SECRET).id;
      }
    } catch (err) {
      return socket.disconnect(); // invalid token
    }

    // Register normal user
    if (token) {
      map.set(userId, socket.id);
      revMap.set(socket.id, userId);
    }

    // Register admin
    if (adminToken) {
      socket.join("admins");
    }

    // --- Event handlers ---
    socket.on("New Service Booked - to server", (ticket) => {
      io.to("admins").emit("New Service Booked - to admin", ticket);
    });

    socket.on("Service Cancelled - to server", (ticket) => {
      io.to("admins").emit("Service Cancelled - to admin", ticket);
    });

    socket.on("Worker Assigned - to server", (ticket) => {
      const clientId = map.get(ticket.customer.id);
      const workerId = map.get(ticket.worker.id);

      if (clientId) io.to(clientId).emit("Worker Assigned - to client", ticket);
      if (workerId)
        io.to(workerId).emit("Worker Assigned - to client (worker)", ticket);
    });

    socket.on("Service Completed - to server", (ticket) => {
      io.to("admins").emit("Service Completed - to admin", ticket);
      const clientId = map.get(ticket.customer.id);
      if (clientId)
        io.to(clientId).emit("Service Completed - to client", ticket);
    });

    // --- Cleanup on disconnect ---
    socket.on("disconnect", () => {
      const userId = revMap.get(socket.id);
      if (userId) {
        map.delete(userId);
        revMap.delete(socket.id);
      }
    });
  });
};

export default socketInit;
