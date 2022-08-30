import { Box, Button, Pagination, Spinner, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, recoverCountry, showCountries } from '../features/CountrySlice'
import { changeModal, showModal } from '../features/ModalSlice'
import CountryModal from './CountryModal'

const AdminCountries = () => {

    const dispatch = useDispatch()

    const countries = useSelector(showCountries)
    const [indices, setIndices] = useState([0, 10])
    const [currentCountries, setCurrentCountries] = useState([])
    const [selected, setselected] = useState()
    const modal = useSelector(showModal)

    const handleModal = async (id) => {
        setselected(id)
        dispatch(changeModal())
    }

    const handleChange = ({ startIndex, endIndex }) => {
        const nextCountries = countries.slice(startIndex, endIndex)
        setCurrentCountries(nextCountries)
        setIndices([startIndex, Math.min(endIndex, countries.length)])
    }

    useEffect(() => {
        dispatch(fetchCountries())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setCurrentCountries(countries.slice(0, 10))
    }, [countries])

    return (
        <div>
            {modal && <CountryModal country={countries.find(country => country._id === selected)} />}
            {countries.loading ? <Spinner /> :
                <>
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableCell scope='col' border="bottom" align='center'>Country ID</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Flag</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Name</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Active</TableCell>
                                <TableCell scope='col' border="bottom"></TableCell>
                                <TableCell scope='col' border="bottom"></TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentCountries?.map((country, ind) =>
                                <TableRow key={country._id} style={{ background: `${ind % 2 === 0 ? '#eeeeee' : ''}` }}>
                                    <TableCell>{country._id}</TableCell>
                                    <TableCell><img style={{ height: '35px', aspectRatio: '16/9' }} src={`http://127.0.0.1:8000${country.image}`} alt="flag" /></TableCell>
                                    <TableCell align='center'>{country.name}</TableCell>
                                    <TableCell align='center' style={country.is_active ? { color: "blue" } : { color: "red" }}>{country.is_active ? "Active" : "Deleted"}</TableCell>
                                    <TableCell><Button label='Edit' primary color={"lightgreen"} /></TableCell>
                                    <TableCell>
                                        {country.is_active ?
                                            <Button label='Delete' primary color={"red"} style={{ color: 'white' }} onClick={() => handleModal(country._id)} />
                                            :
                                            <Button label='Recover' primary color={"blue"} style={{ color: 'white' }} onClick={()=> dispatch(recoverCountry(country._id))} />
                                    }
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                    <Box align="center" direction="row" justify="between">
                        <Text>
                            Showing {indices[0] + 1} - {countries.length < 10 ? countries.length : indices[1]} of {countries.length}
                        </Text>
                        <Pagination numberItems={countries.length} onChange={handleChange} />
                    </Box>


                </>
            }
        </div>
    )
}

export default AdminCountries