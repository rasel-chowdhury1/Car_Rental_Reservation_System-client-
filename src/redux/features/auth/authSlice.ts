import { createSlice } from "@reduxjs/toolkit";

type TAuth = {
    user: null | object,
    token: null | string
}

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
const initialState: TAuth = {
    user: null,
    token: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
       setUser: (state, action) => {
        const {user, token} = action.payload;
           state.user = user;
           state.token = token;
       },
       logout: (state) => {
         state.user = null;
         state.token = null;
       }
    }
})

export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state) => state.auth.token;
export const useCurrentUser = (state) => state.auth.user;