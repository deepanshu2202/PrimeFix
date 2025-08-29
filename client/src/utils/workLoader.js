import { redirect } from "react-router-dom";
import store from "../redux/store/store";
import authLoader from "./authLoader";
import { getWorkTickets } from "./api";
import { setWorkTickets } from "../redux/slice/globalSlice";

export const workLoader = async (args) => {
  try {
    const authData = await authLoader(args);
    const role = store.getState().user.role;

    if (role === "user") {
      throw redirect("/");
    }

    const res = await getWorkTickets();
    const resData = res.data;

    // console.log(resData);
    store.dispatch(setWorkTickets({resData}));
    return { auth: authData, role };
  } catch (err) {
    console.log(err);
    throw err;
  }
};