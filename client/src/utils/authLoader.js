import store from "./../redux/store/store";
import { redirect } from "react-router-dom";
import { setUser } from "../redux/slice/userSlice";
import { setAllTickets } from "../redux/slice/globalSlice";
import { getAllTickets, getMe } from "./api";

const authLoader = async () => {
  const user = store.getState().user.instance;
  if (!user) {
    try {
      const res = await getMe();
      const currUser = res.data;

      const ticketRes = await getAllTickets();
      const tickets = ticketRes.data;
      // console.log(tickets);

      store.dispatch(
        setUser({
          name: currUser.name,
          email: currUser.email,
          instance: currUser,
          address: currUser.address,
        })
      );

      store.dispatch(setAllTickets({tickets}));
    } catch (err) {
      console.log("Error:", err);
      throw redirect("/login");
    }
  }
  return null;
};

export default authLoader;
