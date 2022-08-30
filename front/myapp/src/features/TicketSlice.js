import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: [],
    URL: 'http://127.0.0.1:8000/usertickets/',
    error: '',
    loading: false,
};

const fetchTickets = createAsyncThunk('ticket/getTickets', async () => {
    const response = await axios.get(initialState.URL, {headers:{
        'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    }});
    return response.data;
})

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchTickets.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            state.value = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchTickets.rejected, (state, action) => {
            state.error = action.error.message
            state.value = []
            state.loading = false
        })
    }
})

export { fetchTickets }
export const showTickets = (state) => state.ticket
export default ticketSlice.reducer