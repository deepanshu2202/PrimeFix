import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedService: {
    id: "1",
    title: "Plumbing Services",
  },
  allTickets: [],
  workTickets: [],
  socketMeta: {
    connected: false,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService.id = action.payload.id;
      state.selectedService.title = action.payload.title;
    },
    setAllTickets: (state, action) => {
      const { newTicket, updatedTickets } = action.payload;

      if (newTicket) {
        state.allTickets = [newTicket, ...state.allTickets]; 
      } else {
        state.allTickets = updatedTickets;
      }
    },
    setWorkTickets: (state, action) => {
      const { newTicket, updatedTickets } = action.payload;

      if (newTicket) {
        state.workTickets = [newTicket, ...state.workTickets]; 
      } else {
        state.workTickets = updatedTickets;
      }
    },
    setSocketMeta: (state, action) => {
      state.socketMeta = { ...state.socketMeta, ...action.payload };
    },
  },
});

export const {
  setSelectedService,
  setAllTickets,
  setWorkTickets,
  setSocketMeta,
} = globalSlice.actions;

export default globalSlice.reducer;
