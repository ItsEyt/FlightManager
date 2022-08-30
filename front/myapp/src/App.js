import { useEffect } from 'react';
import { Grommet } from 'grommet';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Flight from './components/Flight';
import Sidenav from './components/Sidenav';
import Profile from './components/Profile';
import Flights from './components/Flights';
import Register from './components/Register';
import Countries from './components/Countries';
import CollapsableNav from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import ProfileEdit from './components/ProfileEdit';
import { checkLogin } from './features/LoggedSlice';
import { showsidenav } from './features/SidenavSlice';
import { useDispatch, useSelector } from 'react-redux';
import ManageFlights from './components/ManageFlights';
import AddFlight from './components/AddFlight';
import EditFlight from './components/EditFlight';
import AdminPanel from './components/AdminPanel';
import AdminUsers from './components/AdminUsers';
import AdminCountries from './components/AdminCountries';
import AdminFlights from './components/AdminFlights';


const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

function App() {
    const sidenav = useSelector(showsidenav)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkLogin())
        // eslint-disable-next-line
    }, [])


    return (
        <Grommet theme={theme}>
            <CollapsableNav></CollapsableNav>
            {sidenav && <div style={{ position: 'absolute', right: '0%', height: '100%' }}><Sidenav /></div>}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/flights" element={<Flights />} />
                <Route path= "/flightsbycountry/:country" element={<Flights />} />
                <Route path="/manageflights" element={<ManageFlights />} >
                    <Route path="/manageflights/addflight" element={<AddFlight />} />
                    <Route path="/manageflights/editflight/:id" element={<EditFlight />} />
                </Route>
                <Route path="flights/:id" element={<Flight />} />
                <Route path="/admin/" element={<AdminPanel />}>
                    <Route path="/admin/users" element={<AdminUsers/>}/>
                    <Route path="/admin/countries" element={<AdminCountries/>}/>
                    <Route path="/admin/flights" element={<AdminFlights/>}/>
                </Route>
                <Route path="/countries" element={<Countries />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/editprofile" element={<ProfileEdit />} />
            </Routes>
        </Grommet>
    );
}

export default App;
