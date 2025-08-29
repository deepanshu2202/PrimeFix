import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    instance: null,
    name: "",
    email: "",
    role: "",
    address: {
      main: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
      phone: "",
      altPhone: ""
    },
  },
  reducers: {
    setUser: (state, actions) => {
      state.name = actions.payload.name || state.name;
      state.email = actions.payload.email || state.email;
      state.role = actions.payload.role || state.role;
      state.address = actions.payload.address ?? state.address;
      state.instance = actions.payload.instance ?? state.instance;
    },
    resetUser: (state) => {
      state.name = "";
      state.instance = null;
      state.email = "";
      state.role = "";
      Object.keys(state.address).forEach(key => {
        state.address[key] = "";
      })
    }
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
