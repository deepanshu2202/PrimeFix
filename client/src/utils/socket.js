import { io } from "socket.io-client";
import store from "../redux/store/store";
import { setAllTickets, setWorkTickets } from "../redux/slice/globalSlice";

export const createSocket = () => {
  const socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
    transports: ["websocket"],
  });

  return socket;
};

export const socketInit = (socket) => {
  socket.off("connect");
  socket.off("Worker Assigned - to client");
  socket.off("Worker Assigned - to client (worker)");
  socket.off("Service Completed - to client");

  socket.on("connect", () => {
    const userId = store.getState().user.id;
    socket.emit("register", userId);
  });

  socket.on("Worker Assigned - to client", (newTicket) => {
    const tickets = store.getState().global.allTickets;

    const updatedTickets = Object.values(tickets)
      .flat()
      .map((ticket) => (ticket._id === newTicket._id ? newTicket : ticket));

    store.dispatch(setAllTickets({ updatedTickets }));
  });

  socket.on("Worker Assigned - to client (worker)", (newTicket) => {
    store.dispatch(setWorkTickets({ newTicket }));
  });

  socket.on("Service Completed - to client", (newTicket) => {
    const tickets = store.getState().global.allTickets;

    const updatedTickets = Object.values(tickets)
      .flat()
      .map((ticket) => (ticket._id === newTicket._id ? newTicket : ticket));
    store.dispatch(setAllTickets({ updatedTickets }));
  });
};

export const serviceBooked = (socket, ticket) => {
  const event = "New Service Booked - to server";
  socket.emit(event, ticket);
};

export const serviceCompleted = (socket, ticket) => {
  const event = "Service Completed - to server";
  socket.emit(event, ticket);
};

export const serviceCancelled = (socket, ticket) => {
  const event = "Service Cancelled - to server";
  socket.emit(event, ticket);
};

export const newUserRegistered = (socket, user) => {
  const event = "New User Registered - to server";
  socket.emit(event, user);
}