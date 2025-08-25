import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

export const globalSlice = createSlice({
    name:"gloabl",
    initialState,
    reducers:{
        setUser: (state, actions) => {
            state.user = actions.payload ?? state.user;
        }
    },
})

export const { setUser } = globalSlice.actions;

export default globalSlice.reducer;