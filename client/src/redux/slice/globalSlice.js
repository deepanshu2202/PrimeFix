import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedService: {
        id:"1",
        title:"Plumbing Services",
    },
    allTickets: null,
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
        }
    },
})

export const { setSelectedService, setAllTickets } = globalSlice.actions;

export default globalSlice.reducer;