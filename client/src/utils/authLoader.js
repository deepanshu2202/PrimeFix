import store from "./../redux/store/store";
import { redirect } from "react-router-dom";
import { getAllTickets, getMe } from "./api";
import { setUser } from "../redux/slice/userSlice";
import { setAllTickets } from "../redux/slice/globalSlice";
// import { createSocket, socketInit } from "./socket";

const authLoader = async () => {
  const user = store.getState().user.instance;
  if (!user) {
    try {
      const res = await getMe();
      const currUser = res.data;

      const ticketRes = await getAllTickets();
      const tickets = ticketRes.data;

      // store only serializable data in Redux
      store.dispatch(
        setUser({
          id: currUser._id,
          name: currUser.name,
          email: currUser.email,
          instance: currUser,
          role: currUser.role,
          address: currUser.address,
        })
      );

      store.dispatch(setAllTickets({ tickets }));
    } catch (err) {
      console.log("Error:", err);
      throw redirect("/login");
    }
  }

  // Initialize socket outside Redux
  // const socket = createSocket();
  // socketInit(socket);

  // Optional: store socket metadata only (if you need to track connection state in Redux)
  // const isConnected = socket.connected;
  // store.dispatch(setSocketMeta({ isConnected }));

  return null;
};

export default authLoader;
