import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SURL = 'http://127.0.0.1:8000/'

const initialState = {
    value: [],
    error: '',
    loading: false,
    singular: {},
    filtered: []
};

const fetchFlights = createAsyncThunk('flight/getFlights', async (id = -1) => {
    const response = await axios.get(`${SURL}flight/${id}`,
        jwt_decode(localStorage.getItem("tokens")).exp * 1000 - Date.now() > 0 ? {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        } : null
    );
    return response.data;
})

const fetchFlightsByAirline = createAsyncThunk('flight/getFlightsByAirline', async () => {
    const response = await axios.get(`${SURL}flightbyairline/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        }
    });
    return response.data;
})

const deleteFlight = createAsyncThunk('flight/deleteflight', async (id) => {
    const response = await axios.delete(`${SURL}delflight/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        }
    });
    return response.data;
})

const recoverFlight = createAsyncThunk('flight/recoverflight', async (id) => {
    const response = await axios.put(`${SURL}recoverflight/${id}`,
        {},
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        });
    return response.data;
})

const editFlight = createAsyncThunk('flight/editflight', async (context) => {
    const response = await axios.put(`${SURL}updateflight/${context.id}`, {
        origin: context.origin,
        destination: context.destination,
        departure: context.departure,
        landing: context.landing,
        tickets: context.tickets
    },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        });
    return response.data;
})

const bookFlight = createAsyncThunk('flight/bookflight', async (id) => {
    const response = await axios.post(`${SURL}addticket/${id}`,
        {},
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            }
        });
    return response.data;
})

export const flightSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        addflight(state, action) {
            console.log(action.payload)
            state.value.push(action.payload)
        },
        filterFlight(state, action) {
            state.value = state.filtered.filter(x => x["destination country"].name?.toLowerCase().includes(action.payload.country?.toLowerCase()) && x["departure time"] >= (action.payload?.deptTime))
        },
    },
    extraReducers: builder => {
        // start Fetch All Flights
        builder.addCase(fetchFlights.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchFlights.fulfilled, (state, action) => {
            state.loading = false
            action.payload instanceof Array ?
                state.value = action.payload
                :
                state.singular = action.payload
            state.error = ''
            state.filtered = state.value
        })
        builder.addCase(fetchFlights.rejected, (state, action) => {
            state.loading = false
            state.value = []
            state.error = action.error.message
            console.log(state.error)
        })
        // end

        // start Fetch Flights By Airline
        builder.addCase(fetchFlightsByAirline.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFlightsByAirline.fulfilled, (state, action) => {
            state.loading = false
            state.value = action.payload
            state.error = ''
        })
        builder.addCase(fetchFlightsByAirline.rejected, (state, action) => {
            state.loading = false
            state.value = []
            state.error = action.error.message
            console.log(state.error)
        })
        // end

        // start Delete A Flight
        builder.addCase(deleteFlight.fulfilled, (state, action) => {
            state.loading = false
            state.value.splice(state.value.map(flight => flight.id).indexOf(action.payload.id), 1, action.payload)
        })
        builder.addCase(deleteFlight.rejected, (state, action) => {
            state.loading = false
            alert(action.payload)
        })
        // end

        // start Recover A Flight
        builder.addCase(recoverFlight.fulfilled, (state, action) => {
            state.loading = false
            state.value.splice(state.value.map(flight => flight.id).indexOf(action.payload.id), 1, action.payload)
        })
        builder.addCase(recoverFlight.rejected, (state, action) => {
            state.loading = false
            alert(action.payload)
        })
        // end

        // start Edit A Flight
        builder.addCase(editFlight.pending, (state) => {
            state.loading = true
        })
        builder.addCase(editFlight.fulfilled, (state, action) => {
            state.loading = false
            state.value = state.value.map(flight => flight.id === action.payload.id ? action.payload : flight)
        })

        builder.addCase(editFlight.rejected, (state) => {
            state.loading = false
        })
        // end

        // start Book Flight
        builder.addCase(bookFlight.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            console.log(action.error)
        })
        builder.addCase(bookFlight.fulfilled, (state, action) => {
            state.loading = false
            alert(`Succesfully booked flight number ${action.payload.flight.id}`)
            state.singular = action.payload.flight

        })
        //end
    }
})

export { fetchFlights, fetchFlightsByAirline, deleteFlight, editFlight, bookFlight, recoverFlight }
export const { addflight, filterFlight } = flightSlice.actions
export const showFlights = (state) => state.flights
export default flightSlice.reducer