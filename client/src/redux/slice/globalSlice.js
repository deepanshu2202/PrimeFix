import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedService: {
    id: "1",
    title: "Plumbing Services",
  },
  allTickets: null,
  workTickets: null,
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
      state.allTickets = action.payload;
    },
    setWorkTickets: (state, action) => {
      state.workTickets = action.payload;
    },
    // Optional: update socket metadata instead of raw socket
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
