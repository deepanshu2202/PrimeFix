import store from './../redux/store/store';
import { redirect } from "react-router-dom";
import { setUser } from "../redux/slice/userSlice";

const authLoader = () => {
    const user = store.getState().user;
    if (!user.name) {
        console.log("USER NOT FOUND!");
        store.dispatch(setUser({ name: "deep" }));

        throw redirect('/profile');
    }

    console.log("USER FOUND!");
    return null;
}

export default authLoader;
