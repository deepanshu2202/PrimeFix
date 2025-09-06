import { io } from "socket.io-client";
import store from "../redux/store/store";
import { setAllTickets, setAllUsers } from "../redux/slice/globalSlice";

export const createSocket = () => {
  const socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
    transports: ["websocket"],
  });

  return socket;
};

export const socketInit = (socket) => {
  socket.off("connect");
  socket.off("Service Cancelled - to admin");
  socket.off("Service Completed - to admin");
  socket.off("New Service Booked - to admin");
  socket.off("Worker Assigned - to admin");

  socket.on("connect", () => {
    socket.emit("register - admin");
  });

  socket.on("New Service Booked - to admin", (newTicket) => {
    store.dispatch(setAllTickets({ newTicket }));
  });

  socket.on("Service Cancelled - to admin", (newTicket) => {
    const allTickets = store.getState().global.allTickets;
    const updatedTickets = Object.values(allTickets).flat().map((ticket) => (
      ticket._id === newTicket._id ? newTicket : ticket
    ))
    store.dispatch(setAllTickets({updatedTickets}));
  });
  
  socket.on("Service Completed - to admin", (newTicket) => {
    const allTickets = store.getState().global.allTickets;
    const updatedTickets = Object.values(allTickets).flat().map((ticket) => (
      ticket._id === newTicket._id ? newTicket : ticket
    ))
    store.dispatch(setAllTickets({updatedTickets}));
  })

  socket.on("Worker Assigned - to admin", (newTicket) => {
    const allTickets = store.getState().global.allTickets;
    const updatedTickets = Object.values(allTickets).flat().map((ticket) => (
      ticket._id === newTicket._id ? newTicket : ticket
    ))
    store.dispatch(setAllTickets({updatedTickets}));
  })

  socket.on("New User Registered - to admin", (newUser) => {
    store.dispatch(setAllUsers({newUser}));
  })
};

export const workerAssigned = (socket, ticket) => {
  const event = "Worker Assigned - to server";
  socket.emit(event, ticket);
};
