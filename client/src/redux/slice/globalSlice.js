import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedService: {
        id:"1",
        title:"Plumbing Services",
    },
    allTickets: null,
    workTickets: null,
    socket: null,
}

export const globalSlice = createSlice({
    name:"gloabl",
    initialState,
    reducers:{
        setSelectedService: (state, actions) => {
            state.selectedService.id = actions.payload.id;
            state.selectedService.title = actions.payload.title;
        },
        setAllTickets : (state, actions) => {
            state.allTickets = actions.payload;
        },
        setWorkTickets: (state, actions) => {
            state.workTickets = actions.payload;
        },
        setSocket: (state, actions) => {
            state.socket = actions.payload;
        }
    },
})

export const { setSelectedService, setAllTickets, setWorkTickets } = globalSlice.actions;

export default globalSlice.reducer;