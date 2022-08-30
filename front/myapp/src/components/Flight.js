import { FormPrevious } from 'grommet-icons';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, PageHeader } from 'grommet';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { bookFlight, fetchFlights, showFlights } from '../features/FlightSlice';
import { isLogged } from '../features/LoggedSlice';

const Flight = () => {
    let { id } = useParams();
    const logged = useSelector(isLogged)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const flight = useSelector(showFlights)
    const deptime = new Date(flight.singular["departure time"])
    const arrivaltime = new Date(flight.singular["landing time"])
    const totalflight = Math.round((arrivaltime.getTime() - deptime.getTime())/ (1000 * 3600))
    const [hasLoaded, sethasLoaded] = useState(false)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false };

    useEffect(() => {
        const getFlight = async () => {
            dispatch(fetchFlights(id)).then(sethasLoaded(true))
        }
        getFlight()
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ display: "inline-block", marginLeft: "2%" }}>
            {flight.loading ? <div>Loading...</div> : hasLoaded && <PageHeader
                title={`${flight.singular["origin country"].name} → ${flight.singular["destination country"].name} `}
                subtitle={flight.singular["airline company"].username}
                parent={<FormPrevious onClick={() => navigate(-1)} />}
                actions={logged ? <Button style={{ right: 'right' }} label="Book flight" primary onClick={()=> dispatch(bookFlight(id))}/> : <Link to="/Login"><Button primary label="log in"/></Link>}
            />}
            <div style={{ display: 'inline-block', margin:'2%' }}>
                <h3 style={{ display: 'inline-block' }}>Total available seats left: </h3> <p style={{ display: 'inline-block' }}>{flight.singular["remaining tickets"]}</p> <br />
                <h3 style={{ display: 'inline-block', color: 'blue' }}>Departure: </h3> <p style={{ display: 'inline-block' }}>{deptime.toLocaleDateString("en-US", options)} </p><br />
                <h3 style={{ display: 'inline-block', color: 'green', }}> Arrival: </h3> <p style={{ display: 'inline-block' }}>{arrivaltime.toLocaleDateString("en-US", options)} </p><br />
                <h3 style={{ display: 'inline-block' }}> Total flight time: </h3> <p style={{ display: 'inline-block' }}>{totalflight}</p>
            </div>
        </div >

    )
}
export default Flight