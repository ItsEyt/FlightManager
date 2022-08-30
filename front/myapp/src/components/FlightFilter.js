import { Box, Form, FormField } from 'grommet'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { filterFlight } from '../features/FlightSlice';

const FlightFilter = () => {

    const dispatch = useDispatch()
    const [filters, setFilters] = useState({country: '', deptTime: ''})

    const addCountryFilter = (event) => {
        setFilters(prev => ({...prev, country: event}))
    }

    const addDeptTimeFilter = (event) => {
        if(event !== '' ) event+="Z"
        console.log(event)
        setFilters(prev => ({...prev, deptTime: event}))
    }

    useEffect(() => {
        dispatch(filterFlight(filters))
        // eslint-disable-next-line
    }, [filters])
    

    return (
        <div>
            <Form style={{background:'#eeeeee', paddingLeft:'10px'}}>
                <Box direction='row'>
                    <FormField
                        label="Where to go"
                        name="Available Tickets"
                        placeholder="Country"
                        onChange={(event) => addCountryFilter(event.target.value)}
                    />
                    <FormField
                        label="Departure date and time"
                    >
                        <input id='dame' type="datetime-local" style={{
                            background:'#eeeeee',
                            fontSize: '18px', font: 'Roboto', border: 'none',
                            padding: '10px', color: '#AAAAAA', fontWeight: 'bolder'
                        }} onChange={(e) => addDeptTimeFilter(e.target.value)} />
                    </FormField>
                </Box>
            </Form>
        </div>
    )
}

export default FlightFilter