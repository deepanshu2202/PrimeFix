import { getAdmin, getAllUsers, getAllTickets } from "./api";
import store from "../redux/store/store";
import { redirect } from "react-router-dom";
import { setUser, setAllUsers, setAllTickets } from "../redux/slice/globalSlice";

const authLoader = async () => {
  const user = store.getState().global.user;
  if (!user) {
    try {
      const res = await getAdmin();
      const currUser = res.data;
      const resGetAllUsers = await getAllUsers();
      const currAllUsers = resGetAllUsers.data;
      const resTicket = await getAllTickets();
      const currAllTickets = resTicket.data;

      store.dispatch(setUser({ currUser }));
      store.dispatch(setAllUsers({ updatedUsers: currAllUsers }));
      store.dispatch(setAllTickets({ updatedTickets: currAllTickets }));
    } catch (err) {
      console.log("Error:", err);
      throw redirect("/login");
    }
  }
  return null;
};

export default authLoader;
