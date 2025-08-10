import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name:"",
    email:"",
  },
  reducers: {
    setUser: (state, actions) => {
        state.name = actions.payload.name ?? state.name;
        state.email = actions.payload.email ?? state.email;
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer