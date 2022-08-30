import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const initialState = {
    value: false,
    user: localStorage.getItem("tokens") ? jwt_decode(localStorage.getItem("tokens")).username : "",
    userid: localStorage.getItem("tokens") ? jwt_decode(localStorage.getItem("tokens")).userid : ""
};

export const loggedSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        trueLogin: (state) => {
            state.value = true
            state.user = jwt_decode(localStorage.getItem("tokens")).username
        },
        falseLogin: (state) => {
            state.value = false
        },
        checkLogin: (state) => {
            localStorage.getItem("tokens") &&
            jwt_decode(localStorage.getItem("tokens")).exp * 1000 - Date.now() > 0 ? state.value = true : state.value = false
        }
    }
})

export const { trueLogin, falseLogin, checkLogin } = loggedSlice.actions;
export const isLogged = (state) => state.logged.value;
export const loggedUser = (state) => state.logged.user;
export const loggedUserid = (state) => state.logged.userid;
export default loggedSlice.reducer;
