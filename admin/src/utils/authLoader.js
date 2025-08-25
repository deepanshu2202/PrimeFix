import { getAdmin } from "./api";
import store from "../redux/store/store";
import { redirect } from "react-router-dom";
import { setUser } from "../redux/slice/globalSlice";

const authLoader = async () => {
  const user = store.getState().global.user;
  if (!user) {
    try {
      const res = await getAdmin();
      const currUser = res.data;
      store.dispatch(setUser({ currUser }));
    } catch (err) {
      console.log("Error:", err);
      throw redirect("/login");
    }
  }
  return null;
};

export default authLoader;
