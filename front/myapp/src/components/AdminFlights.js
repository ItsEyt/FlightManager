import { Box, Button, Pagination, Spinner, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchFlights, recoverFlight, showFlights } from '../features/FlightSlice'
import { loggedUserid } from '../features/LoggedSlice'
import { changeModal, showModal } from '../features/ModalSlice'
import FlightModal from './FlightModal'

const AdminFlights = () => {

    const dispatch = useDispatch()

    const flights = useSelector(showFlights)
    const navigate = useNavigate()
    const [indices, setIndices] = useState([0, 10])
    const [currentflights, setCurrentFlights] = useState([])
    const [selected, setselected] = useState()
    const modal = useSelector(showModal)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false };


    const handleModal = async (id) => {
        setselected(id)
        dispatch(changeModal())
    }

    const handleChange = ({ startIndex, endIndex }) => {
        const nextflights = flights.value.slice(startIndex, endIndex)
        setCurrentFlights(nextflights)
        setIndices([startIndex, Math.min(endIndex, flights.value.length)])
    }

    useEffect(() => {
        dispatch(fetchFlights())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setCurrentFlights(flights.value.slice(0, 10))
    }, [flights])

    return (
        <div style={{position:'absolute'}}>
            {modal && <FlightModal flight={flights.value.find(flight => flight.id === selected)} />}
            {flights.loading ? <Spinner /> :
                <>
                {console.log(flights)}
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableCell scope='col' border="bottom" align='center'>Flight ID</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Airline</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Departure</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Landing</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Departure Time</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Landing Time</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Active</TableCell>
                                <TableCell scope='col' border="bottom"></TableCell>
                                <TableCell scope='col' border="bottom"></TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentflights?.map((flight, ind) =>
                                <TableRow key={flight.id} style={{ background: `${ind % 2 === 0 ? '#eeeeee' : ''}` }}>
                                    <TableCell>{flight.id}</TableCell>
                                    <TableCell><img style={{ height: '25px', aspectRatio: '16/9' }} src={`http://127.0.0.1:8000${flight["airline company"].image}`}/>{flight["airline company"].username}</TableCell>
                                    <TableCell>
                                        <img style={{ height: '25px', aspectRatio: '16/9' }} src={`http://127.0.0.1:8000${flight["origin country"].image}`} alt="flag" /> {flight["origin country"].name}
                                    </TableCell>
                                    <TableCell>
                                        <img style={{ height: '25px', aspectRatio: '16/9' }} src={`http://127.0.0.1:8000${flight["destination country"].image}`} alt="flag" /> {flight["destination country"].name}
                                    </TableCell>
                                    <TableCell align='center'>{new Date(flight["departure time"]).toLocaleDateString("en-US", options)}</TableCell>
                                    <TableCell align='center'>{new Date(flight["landing time"]).toLocaleDateString("en-US", options)}</TableCell>
                                    <TableCell align='center' style={flight["is active"] ? { color: "blue" } : { color: "red" }}>{flight["is active"] ? "Active" : "Deleted"}</TableCell>
                                    <TableCell><Button label='Edit' primary color={"lightgreen"} onClick={()=> navigate(`/manageflights/editflight/${flight.id}`)}/></TableCell>
                                    <TableCell>
                                        {flight["is active"] ?
                                            <Button label='Delete' primary color={"red"} style={{ color: 'white' }} onClick={() => handleModal(flight.id)} />
                                            :
                                            <Button label='Recover' primary color={"blue"} style={{ color: 'white' }} onClick={()=> dispatch(recoverFlight(flight.id))} />
                                    }
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                    <Box align="center" direction="row" justify="between">
                        <Text>
                            Showing {indices[0] + 1} - {flights.value.length < 10 ? flights.value.length : indices[1]} of {flights.value.length}
                        </Text>
                        <Pagination numberItems={flights.value.length} onChange={handleChange} />
                    </Box>


                </>
            }
        </div>
    )
}

export default AdminFlights