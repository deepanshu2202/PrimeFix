import userReducer from "../slice/userSlice";
import globalReducer from "../slice/globalSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
  },
});

export default store;