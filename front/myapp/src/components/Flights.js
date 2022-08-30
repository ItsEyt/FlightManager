import React, { useEffect } from 'react'
import { Cart, ShareOption } from 'grommet-icons'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchFlights, filterFlight, showFlights } from '../features/FlightSlice';
import { Card, Button, CardHeader, CardFooter, CardBody } from 'grommet';
import FlightFilter from './FlightFilter';

const Flights = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { country } = useParams()
    const flights = useSelector(showFlights)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false };

    const copyToClip = (event, id) => {
        console.log(location)
        navigator.clipboard.writeText(`http://localhost:3000/flights/${id}`)
        event.stopPropagation()
    }

    useEffect(() => {
        const load = async() => {
            let res = await dispatch(fetchFlights())
            if(res) if (country) dispatch(filterFlight({ country: country, deptTime: '' }))
        
        }
        load()
        // eslint-disable-next-line
    }, [])
    
    return (
        <>
            <FlightFilter />
            {flights.loading ? <div>loading..</div> : flights?.value.map((flight) =>
                <div key={flight.id} onClick={() => navigate(`/flights/${flight.id}`)} style={{ display: "inline-block" }}>
                    <Card height="auto" width="auto" background="light-1" margin="5px" >
                        <Button >
                            <CardHeader pad="medium">{flight["airline company"].username}</CardHeader>
                            <CardBody pad="medium" style={{ display: 'inline-block' }}>
                                <img style={{ width: '30px', aspectRatio: '16/9' }} src={`http://127.0.0.1:8000${flight["origin country"].image}`} alt="flag" />
                                {flight["origin country"].name} →
                                <img style={{ width: '30px', aspectRatio: '16/9' }} src={`http://127.0.0.1:8000${flight["destination country"].image}`} alt="flag" />
                                {flight["destination country"].name}<br />
                                {new Date(flight["departure time"]).toLocaleDateString("en-US", options)}
                            </CardBody>
                        </Button>
                        <CardFooter direction='row' pad={{ horizontal: "large" }} background="light-2">
                            <Button
                                icon={<Cart color="green" />}
                                hoverIndicator
                            />
                            <hr />
                            <Button icon={<ShareOption color="plain" />} onClick={(e) => copyToClip(e, flight.id)} hoverIndicator />
                        </CardFooter>
                    </Card>
                    <br />
                </div>
            )}
        </>
    )
}

export default Flights