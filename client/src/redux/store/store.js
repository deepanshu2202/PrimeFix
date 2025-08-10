import userReducer from "../slice/userSlice";
import serviceSlice from "../slice/serviceSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    services: serviceSlice,
  },
});

export default store;