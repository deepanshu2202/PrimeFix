import { io } from "socket.io-client";
import store from '../redux/store/store';
import { setAllTickets, setWorkTickets } from "../redux/slice/globalSlice";

export const createSocket = () => {
  const socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
    transports: ["websocket"],
  });

  return socket;
};

export const socketInit = (socket) => {
    socket.on("connect", () => {
        const userId = store.getState().user.id;
        socket.emit("register", userId);
    });

    socket.on("Worker Assigned - to client", (newTicket) => {
        const tickets = store.getState().global.allTickets;
        const workTickets = store.getState().global.workTickets;
        
        const updatedTicket = Object.values(tickets).flat().map((ticket) => (
            ticket._id === newTicket._id ? newTicket : ticket
        ))
        
        store.dispatch(setAllTickets({updatedTicket}));
        store.dispatch(setWorkTickets({newTicket, ...workTickets}));
    });

    socket.on("Worker Assigned - to client (worker)", (newTicket) => {
        const workTickets = store.getState().global.workTickets;
        store.dispatch(setWorkTickets({newTicket, ...workTickets}));
    });
    
    socket.on("Service Completed - to client", (newTicket) => {
        const tickets = store.getState().global.allTickets;
        const workTickets = store.getState().global.workTickets;

        const updatedTicket = Object.values(tickets).flat().map((ticket) => (
            ticket._id === newTicket._id ? newTicket : ticket
        ))

        const updatedWorkTicket = Object.values(workTickets).flat().map((ticket) => (
            ticket._id === newTicket._id ? newTicket : ticket
        ))

        store.dispatch(setAllTickets({updatedTicket}));
        store.dispatch(setWorkTickets({updatedWorkTicket}));
    })
}

export const serviceBooked = (socket, ticket) => {
    const event = "New Service Booked - to server";
    socket.emit(event, ticket);
}

export const serviceCompleted = (socket, ticket) => {
    const event = "Service Completed - to server";
    socket.emit(event, ticket);
}

export const serviceCancelled = (socket, ticket) => {
    const event = "Service Cancelled - to server";
    socket.emit(event, ticket);
}