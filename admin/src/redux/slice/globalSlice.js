import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    allUsers: null,
    allTickets: null,
}

export const globalSlice = createSlice({
    name:"gloabl",
    initialState,
    reducers:{
        setUser: (state, actions) => {
            state.user = actions.payload ?? state.user;
        },
        setAllUsers: (state, actions) => {
            state.allUsers = actions.payload ?? state.allUsers;
        },
        setAllTickets: (state, actions) => {
            state.allTickets = actions.payload ?? state.allTickets;
        }
    },
})

export const { setUser, setAllUsers, setAllTickets } = globalSlice.actions;

export default globalSlice.reducer;