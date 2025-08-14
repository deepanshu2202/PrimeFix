import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedService: {
        id:"1",
        title:"Plumbing Services",
    },
}

export const globalSlice = createSlice({
    name:"gloabl",
    initialState,
    reducers:{
        setSelectedService: (state, actions) => {
            state.selectedService.id = actions.payload.id;
            state.selectedService.title = actions.payload.title;
        }
    },
})

export const { setSelectedService } = globalSlice.actions;

export default globalSlice.reducer;