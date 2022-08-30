import { Box, Button, Clock, Nav, Sidebar } from 'grommet'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isLogged } from '../features/LoggedSlice'

const Sidenav = () => {
    const logged = useSelector(isLogged)
    return (
        <Box direction="row" height='100%' style={{position:'relative'}}>
            <Sidebar
                responsive={true}
                background="dark-2"
                pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
                footer={logged ? <Link to="/logout"><Button color="brand" label="Logout" /></Link> : <Link to="/login"><Button color="brand" label="Login" /></Link>}
                >
                <Nav gap='small'>
                    <Clock type="digital" />
                    <Link to="/flights"><Button color="brand" label="Flights" /></Link>
                    <Link to="/countries"><Button color="brand" label="Countries" /></Link>                 
                </Nav>
            </Sidebar>
        </Box>
    )
}

Sidenav.args = {
    full: true,
}

export default Sidenav