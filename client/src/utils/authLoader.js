import store from "./../redux/store/store";
import { redirect } from "react-router-dom";
import { getAllTickets, getMe } from "./api";
import { setUser } from "../redux/slice/userSlice";
import { setAllTickets } from "../redux/slice/globalSlice";

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
          id: currUser._id,
          name: currUser.name,
          email: currUser.email,
          instance: currUser,
          role: currUser.role,
          address: currUser.address,
        })
      );

      store.dispatch(setAllTickets({ updatedTickets: tickets }));
    } catch (err) {
      const bool = false;
      if (bool) console.log(err);
      throw redirect("/login");
    }
  }
  return null;
};

export default authLoader;
