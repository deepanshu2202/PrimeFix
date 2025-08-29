import store from "./../redux/store/store";
import { redirect } from "react-router-dom";
import { setUser } from "../redux/slice/userSlice";
import { setAllTickets, setSocket } from "../redux/slice/globalSlice";
import { getAllTickets, getMe } from "./api";
import { createSocket } from "./socket";

const authLoader = async () => {
  const user = store.getState().user.instance;
  if (!user) {
    try {
      const res = await getMe();
      const currUser = res.data;

      const ticketRes = await getAllTickets();
      const tickets = ticketRes.data;

      store.dispatch(
        setUser({
          name: currUser.name,
          email: currUser.email,
          instance: currUser,
          role: currUser.role,
          address: currUser.address,
        })
      );

      store.dispatch(setAllTickets({tickets}));
    } catch (err) {
      console.log("Error:", err);
      throw redirect("/login");
    }
  }

  const socket = store.getState().global.socket;
  if (!socket) {
    const newSocket = createSocket();

    store.dispatch(setSocket({newSocket}));
  }
  return null;
};

export default authLoader;
