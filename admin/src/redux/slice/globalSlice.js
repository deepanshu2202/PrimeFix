import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  allUsers: [],
  allTickets: [],
};

export const globalSlice = createSlice({
  name: "gloabl",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload ?? state.user;
    },
    setAllUsers: (state, actions) => {
      const { newUser, updatedUsers } = actions.payload;
      if (newUser) {
        state.allUsers = [newUser, ...state.allUsers];
      } else {
        state.allUsers = updatedUsers;
      }
    },
    setAllTickets: (state, actions) => {
      const { newTicket, updatedTickets } = actions.payload;

      if (newTicket) {
        state.allTickets = [newTicket, ...state.allTickets];
    } else {
        state.allTickets = updatedTickets;
      }
    },
  },
});

export const { setUser, setAllUsers, setAllTickets } = globalSlice.actions;

export default globalSlice.reducer;
