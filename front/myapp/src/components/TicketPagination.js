import { Box, Pagination, Spinner, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTickets, showTickets } from '../features/TicketSlice'

const TicketPagination = () => {
    const dispatch = useDispatch()
    const tickets = useSelector(showTickets)
    const [indices, setIndices] = useState([0, 10])
    const [currentTickets, setCurrentTickets] = useState([])
    
    const handleChange = ({ startIndex, endIndex }) => {
        const nextTickets = tickets.value.slice(startIndex, endIndex)
        setCurrentTickets(nextTickets)
        setIndices([startIndex, Math.min(endIndex, tickets.value.length)])
    }
    
    useEffect(() => {
        dispatch(fetchTickets())
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        setCurrentTickets(tickets.value.slice(0, 10))
    }, [tickets])
    
    return (
        <div>
            {tickets.loading ? <Spinner /> :
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell scope='col' border="bottom">ticket number</TableCell>
                                <TableCell scope='col' border="bottom">airline</TableCell>
                                <TableCell scope='col' border="bottom">origin country</TableCell>
                                <TableCell scope='col' border="bottom">destination country</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentTickets?.map((ticket,ind) =>
                                <TableRow key={ticket.id} style={{background:`${ind%2===0 ? '#eeeeee': ''}`}}>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.flight["airline company"].username}</TableCell>
                                    <TableCell>{ticket.flight["origin country"].name}</TableCell>
                                    <TableCell>{ticket.flight["destination country"].name}</TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                    <Box align="center" direction="row" justify="between">
                        <Text>
                            Showing {indices[0] + 1} - {tickets.value.length > 10 ? indices[1] : tickets.value.length} of {tickets.value.length}
                        </Text>
                        <Pagination numberItems={tickets.value.length} onChange={handleChange} />
                    </Box>
                </>
            }
        </div >
    )
}

export default TicketPagination