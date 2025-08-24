import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    instance: null,
    name: "",
    email: "",
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
      state.address = actions.payload.address ?? state.address;
      state.instance = actions.payload.instance ?? state.instance;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
