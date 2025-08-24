import store from "./../redux/store/store";
import { redirect } from "react-router-dom";
import { setUser } from "../redux/slice/userSlice";
import { getMe } from "./api";

const authLoader = async () => {
  const user = store.getState().user.instance;
  if (!user) {
    try {
      const res = await getMe();
      const currUser = res.data;
      store.dispatch(
        setUser({
          name: currUser.name,
          email: currUser.email,
          instance: currUser,
          address: currUser.address,
        })
      );
    } catch (err) {
      console.log("Error:", err);
      throw redirect("/login");
    }
  }
  return null;
};

export default authLoader;
