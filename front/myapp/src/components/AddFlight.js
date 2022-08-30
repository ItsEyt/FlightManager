import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Box, Button, Form, FormField, Select } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, showCountries } from '../features/CountrySlice';
import { addflight } from '../features/FlightSlice';



const AddFlight = () => {
    const SURL = 'http://127.0.0.1:8000/'
    const [deptCountry, setDeptCountry] = useState("")
    const [landCountry, setLandCountry] = useState("")
    const [ticket, setTicket] = useState("")
    const [valid, setValid] = useState(false)
    const countries = useSelector(showCountries)
    const [deptDateTime, setDeptDateTime] = useState(false)
    const [landDateTime, setLandDateTime] = useState(false)
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountries())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setOptions(countries.map(country => country.name))
    }, [countries])


    const doaddFlight = async () => {
        await axios.post(`${SURL}addflight/`,
            {
                origin: countries.find(x => x.name === deptCountry),
                destination: countries.find(x => x.name === landCountry),
                departure: deptDateTime,
                landing: landDateTime,
                tickets: ticket
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
                }
            }).then(res => dispatch(addflight(res.data)))
            .catch(error => console.log(error))

    }

    const Reset = () => {
        setTicket("")
        setDeptCountry("")
        setLandCountry("")
        setDeptDateTime(false)
        setLandDateTime(false)
    }

    return (
        <Box animation={{ "type": "fadeIn" }} fill align="center" pad="large">

            <Form
                validate="change"
                onReset={() => Reset()}
                onSubmit={() => doaddFlight()}
                onValidate={(validationResults) => {
                    deptDateTime && landDateTime && setValid(validationResults.valid);
                }}
            >
                <Box>
                    {/* Departure */}
                    <FormField label="Departure" name="Departure">
                        <Select
                            required
                            size="medium"
                            placeholder="Select single option"
                            value={deptCountry}
                            options={options}
                            onChange={({ option }) => setDeptCountry(option)}
                            onClose={() => setOptions(countries.map(country => country.name))}
                            onSearch={(text) => {
                                // The line below escapes regular expression special characters:
                                // [ \ ^ $ . | ? * + ( )
                                const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
                                // Create the regular expression with modified value which
                                // handles escaping special characters. Without escaping special
                                // characters, errors will appear in the console
                                const exp = new RegExp(escapedText, 'i');
                                setOptions(countries.filter((o) => exp.test(o)));
                            }}
                        />
                    </FormField>
                </Box>
                <Box>

                    {/* Landing */}
                    <FormField label="Landing" name="Landing">
                        <Select
                            required
                            size="medium"
                            placeholder="Select single option"
                            value={landCountry}
                            options={options}
                            onChange={({ option }) => setLandCountry(option)}
                            onClose={() => setOptions(countries.map(country => country.name))}
                            onSearch={(text) => {
                                // The line below escapes regular expression special characters:
                                // [ \ ^ $ . | ? * + ( )
                                const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
                                // Create the regular expression with modified value which
                                // handles escaping special characters. Without escaping special
                                // characters, errors will appear in the console
                                const exp = new RegExp(escapedText, 'i');
                                setOptions(countries.filter((o) => exp.test(o)));
                            }}
                        />
                    </FormField>
                </Box>
                <Box>
                    {/* departure date-time */}
                    <FormField
                        label="Departure date and time"
                    >
                        <input id='dame' type="datetime-local" style={{
                            fontSize: '18px', font: 'Roboto', border: 'none',
                            padding: '10px', color: '#AAAAAA', fontWeight: 'bolder'
                        }} onChange={(e) => setDeptDateTime(new Date(e.target.value))} />
                    </FormField>
                </Box>
                <Box>
                    {/* landing date-time */}
                    <FormField
                        label="Landing date and time"
                    >
                        <input id='dale' type="datetime-local" style={{
                            fontSize: '18px', font: 'Roboto', border: 'none',
                            padding: '10px', color: '#AAAAAA', fontWeight: 'bolder'
                        }} onChange={(e) => setLandDateTime(new Date(e.target.value))} />
                    </FormField>
                </Box>
                <Box>
                    {/* Tickets */}
                    <FormField
                        required
                        label="Available Tickets"
                        name="Available Tickets"
                        placeholder="0000"
                        type={'number'}
                        value={ticket}
                        onChange={(event) => setTicket(event.target.value)}
                        validate={[{ regexp: /^[0-9]/i },]}
                    />
                </Box>
                <Box direction="row" justify="evenly" margin={{ top: 'medium' }}>
                    <Button type="reset" label="Reset" />
                    <Button type="submit" label="Add Flight" disabled={!valid} primary />
                </Box>
            </Form>

        </Box>
    )
}

export default AddFlight