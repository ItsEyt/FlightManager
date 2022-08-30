import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
};

export const sidenavSlice = createSlice({
    name: 'sidenav',
    initialState,
    reducers: {
        toggleSidenav: (state) => {
            state.value = !state.value
        },
    }
})

export const { toggleSidenav } = sidenavSlice.actions;
export const showsidenav = (state) => state.sidenav.value;
export default sidenavSlice.reducer;
