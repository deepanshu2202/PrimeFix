import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "user123",
    email: "user12primefix@gmail.com",
    address: {
      main: "226/2, Amrit Colony",
      city: "Rohtak",
      pincode: "124001",
      state: "Haryana",
      country: "India",
      phone: "123-456-7890",
      altPhone: "123-456-7890"
    },
  },
  reducers: {
    setUser: (state, actions) => {
      state.name = actions.payload.name ?? state.name;
      state.email = actions.payload.email ?? state.email;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
