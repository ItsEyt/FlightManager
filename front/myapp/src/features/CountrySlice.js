import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SURL = 'http://127.0.0.1:8000'

const initialState = {
    value: [],
    error: '',
    loading: false,
};

const fetchCountries = createAsyncThunk('country/getCountries', async (id = -1) => {
    const response = await axios.get(`${SURL}/country/${id}`,
    localStorage.getItem('tokens') &&
    jwt_decode(localStorage.getItem("tokens")).exp * 1000 - Date.now() > 0 ? {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        }
    }:null
    );
    return response.data;
})

const deleteCountry = createAsyncThunk('country/deleteCountry', async (id = -1) => {
    const response = await axios.delete(`${SURL}/delcountry/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        })
    return response.data;
})

const recoverCountry = createAsyncThunk('country/recoverCountry', async (id = -1) => {
    const response = await axios.put(`${SURL}/recovercountry/${id}`,
        {},
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        })
    return response.data;
})

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCountries.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.loading = false
            state.value = action.payload
            state.error = ''
        })
        builder.addCase(fetchCountries.rejected, (state, action) => {
            state.loading = false
            state.value = []
            state.error = action.error.message
        })
        builder.addCase(deleteCountry.fulfilled, (state, action) => {
            console.log(action.payload._id)
            state.value.splice(state.value.map(country => country._id).indexOf(action.payload._id),1,action.payload)
        })
        builder.addCase(deleteCountry.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(recoverCountry.fulfilled, (state, action) => {
            state.value.splice(state.value.map(country=> country._id).indexOf(action.payload._id),1,action.payload)
        })
        builder.addCase(recoverCountry.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export { fetchCountries, deleteCountry, recoverCountry }
export const showCountries = (state) => state.country.value
export default countrySlice.reducer