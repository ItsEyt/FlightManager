import React, { useEffect, useState } from 'react';
import { Box, Button, Form, FormField, Select } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, showCountries } from '../features/CountrySlice';
import { editFlight, fetchFlights, showFlights } from '../features/FlightSlice';
import { useParams } from 'react-router-dom';



const EditFlight = () => {
    const { id } = useParams()
    const [deptCountry, setDeptCountry] = useState("")
    const [landCountry, setLandCountry] = useState("")
    const [ticket, setTicket] = useState("")
    const [valid, setValid] = useState(false)
    const countries = useSelector(showCountries)
    const flight = useSelector(showFlights)
    const [deptDateTime, setDeptDateTime] = useState(false)
    const [landDateTime, setLandDateTime] = useState(false)
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFlights(id))
        dispatch(fetchCountries())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setOptions(countries.map(country => country.name))
        setDeptDateTime(flight?.singular?.["departure time"]?.slice(0, -1))
        setDeptCountry(flight?.singular?.["origin country"]?.name)
        setLandCountry(flight?.singular?.["destination country"]?.name)
        setLandDateTime(flight?.singular?.["landing time"]?.slice(0, -1))
        // eslint-disable-next-line
    }, [countries])


    const doEditFlight = (e) => {
        e.stopPropagation()
        dispatch(editFlight(
            {
                id,
                origin: countries.find(x => x.name === deptCountry),
                destination: countries.find(x => x.name === landCountry),
                departure: new Date(deptDateTime),
                landing: new Date(landDateTime),
                tickets: ticket
            }
        ))
    }

    const Reset = () => {
        setDeptCountry(flight?.singular["origin country"]?.name)
        setLandCountry(flight?.singular["destination country"]?.name)
        setTicket(flight?.singular["remaining tickets"])
        setDeptDateTime(flight?.singular?.["departure time"]?.slice(0, -1))
        setLandDateTime(flight?.singular?.["landing time"]?.slice(0, -1))
    }

    return (
        <Box animation={{ "type": "fadeIn" }} fill align="center" pad="large" style={{ backgroundColor: "#eeeeee" }}>

            <Form
                validate="change"
                onReset={() => Reset()}
                onSubmit={(e) => doEditFlight(e)}
                onValidate={(validationResults) => {
                    setValid(validationResults.valid);
                }}
            >
                <Box>
                    {/* Departure */}
                    <FormField label="Departure" name="Departure">
                        <Select
                            required
                            size="medium"
                            placeholder={flight?.singular["origin country"]?.name ?? "Select a country"}
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
                            placeholder={flight?.singular["destination country"]?.name ?? "Select a country"}
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
                        <input id='dame' type="datetime-local"
                            value={deptDateTime}
                            style={{
                                fontSize: '18px', font: 'Roboto', border: 'none',
                                padding: '10px', color: '#AAAAAA', fontWeight: 'bolder'
                            }} onChange={(e) => {
                                setDeptDateTime(e.target.value)
                                console.log(deptDateTime)
                                }} />
                    </FormField>
                </Box>
                <Box>
                    {/* landing date-time */}
                    <FormField
                        label="Landing date and time"
                    >
                        <input id='dale' type="datetime-local"
                            value={landDateTime}
                            style={{
                                fontSize: '18px', font: 'Roboto', border: 'none',
                                padding: '10px', color: '#AAAAAA', fontWeight: 'bolder'
                            }} onChange={(e) => setLandDateTime(e.target.value)} />
                    </FormField>
                </Box>
                <Box>
                    {/* Tickets */}
                    <FormField
                        required
                        label="Available Tickets"
                        name="Available Tickets"
                        placeholder={flight?.singular?.["remaining tickets"]}
                        className="placeholder"
                        type={'number'}
                        value={ticket}
                        onChange={(event) => setTicket(event.target.value)}
                        validate={[{ regexp: /^[0-9]/i },]}
                    />
                </Box>
                <Box direction="row" justify="evenly" margin={{ top: 'medium' }}>
                    <Button type="reset" label="Reset" />
                    <Button type="submit" label="Edit Flight" disabled={!valid} primary />
                </Box>
            </Form>

        </Box>
    )
}

export default EditFlight