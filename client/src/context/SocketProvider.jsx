import { SocketContext } from "./SocketContext";
import { createSocket, socketInit } from "../utils/socket";
import { useEffect } from "react";
import authLoader from '../utils/authLoader';

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    authLoader();
  }, []);

  const socket = createSocket();
  socketInit(socket);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
