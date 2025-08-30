import userReducer from "../slice/userSlice";
import globalReducer from "../slice/globalSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["global/setSocket"], // ignore this action
        ignoredPaths: ["global.newSocket"],   // ignore this slice field
      },
    }),
});

export default store;