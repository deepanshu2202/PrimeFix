import { SocketContext } from "./SocketContext";
import { createSocket, socketInit } from "../utils/socket";

export const SocketProvider = ({ children }) => {
  const socket = createSocket();
  socketInit(socket);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
