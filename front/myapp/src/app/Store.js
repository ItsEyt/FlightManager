import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../features/CountrySlice';
import flightReducer from '../features/FlightSlice';
import loggedReducer from '../features/LoggedSlice';
import ModalReducer from '../features/ModalSlice';
import sidenavReducer from '../features/SidenavSlice';
import ticketReducer from '../features/TicketSlice';
import profileReducer from '../features/UserSlice';

export const store = configureStore({
    reducer: {
        flights: flightReducer,
        logged: loggedReducer,
        country: countryReducer,
        sidenav: sidenavReducer,
        ticket: ticketReducer,
        modal: ModalReducer,
        profile: profileReducer,
    },
});
