import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
};

export const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeModal(state) {
            state.value = !state.value
        }

    }
})

export const showModal = (state) => state.modal.value
export const { changeModal } = ModalSlice.actions
export default ModalSlice.reducer