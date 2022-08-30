import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
import { Edit, Trash } from 'grommet-icons'
import { deleteFlight, fetchFlightsByAirline, showFlights    } from '../features/FlightSlice';
import { Card, Button, CardHeader, CardFooter, CardBody } from 'grommet';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { isLogged, loggedUserid } from '../features/LoggedSlice';

const ManageFlights = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logged = useSelector(isLogged)
    const loggedid = useSelector(loggedUserid)
    const flights = useSelector(showFlights)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false };

    const deleteflightonclick = (event, id) => {
        dispatch(deleteFlight(id))
        event.stopPropagation()
    }

    const editflightonclick = (event) => {
        event.stopPropagation()
    }

    useEffect(() => {
        dispatch(fetchFlightsByAirline(loggedid))
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Link to={`/manageflights/addflight`}><Button color="brand" label="Add a flight" style={{ margin: "5px" }} /></Link>
            <Outlet />
            <br />
            {!logged ? <Login /> : flights.loading ? <div>loading..</div> : flights.value.length > 0 && flights.value.map((flight, ind) =>
                <div key={ind} onClick={() => navigate(`/flights/${flight.id}`)} style={{ display: "inline-block" }}>
                    <Card height="auto" width="auto" background="light-1" margin="5px" >
                        <CardHeader pad="medium">{flight["airline company"].username}</CardHeader>
                        <CardBody pad="medium" style={{display:'inline-block'}}>
                                <img style={{width:'30px', aspectRatio:'16/9'}} src={`http://127.0.0.1:8000${flight["origin country"].image}`} alt="flag"/>
                                {flight["origin country"].name} → 
                                <img style={{width:'30px', aspectRatio:'16/9'}} src={`http://127.0.0.1:8000${flight["destination country"].image}`} alt="flag"/>
                                {flight["destination country"].name}<br />
                                {new Date(flight["departure time"]).toLocaleDateString("en-US", options)}
                            </CardBody>
                        <CardFooter pad={{ horizontal: "small" }} background="light-2">
                            <Button
                                style={{ border: "none", margin: "10px" }}
                                label="delete"
                                icon={<Trash color="red" />}
                                hoverIndicator
                                onClick={(e) => deleteflightonclick(e, flight.id)}
                            />
                            <Link to={`/manageflights/editflight/${flight.id}`} onClick={(e)=> editflightonclick(e)}>
                                <Button
                                    style={{ border: "none", margin: "10px" }}
                                    label="edit"
                                    icon={<Edit color="plain" />}
                                    hoverIndicator />
                            </Link>
                        </CardFooter>
                    </Card>
                    <br />
                </div>
            )}
            <br />
        </div>
    )
}

export default ManageFlights