import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SURL = 'http://127.0.0.1:8000'

const initialState = {
    value: [],
    error: '',
    loading: false,
};

const fetchProfiles = createAsyncThunk('profile/getProfiles', async (id = -1) => {
    const response = await axios.get(`${SURL}/profile/${id}`,
    localStorage.getItem('tokens') &&
    jwt_decode(localStorage.getItem("tokens")).exp * 1000 - Date.now() > 0 ? {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        }
    }:null
    );
    return response.data;
})

const deleteProfile = createAsyncThunk('country/deleteProfile', async (id = -1) => {
    const response = await axios.delete(`${SURL}/delprofile/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        })
    return response.data;
})

const recoverProfile = createAsyncThunk('country/recoverProfile', async (id = -1) => {
    const response = await axios.put(`${SURL}/recoverprofile/${id}`,
        {},
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        })
    return response.data;
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchProfiles.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProfiles.fulfilled, (state, action) => {
            state.loading = false
            state.value = action.payload
            state.error = ''
        })
        builder.addCase(fetchProfiles.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(deleteProfile.fulfilled, (state, action) => {
            state.value.splice(state.value.map(user => user.id).indexOf(action.payload.id),1,action.payload)
        })
        builder.addCase(deleteProfile.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(recoverProfile.fulfilled, (state, action) => {
            console.log(action.payload)
            state.value.splice(state.value.map(user => user.id).indexOf(action.payload.id),1,action.payload)
        })
        builder.addCase(recoverProfile.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export { fetchProfiles, deleteProfile, recoverProfile }
export const showProfiles = (state) => state.profile
export default profileSlice.reducer