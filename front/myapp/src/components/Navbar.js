import React from 'react';
import jwt_decode from "jwt-decode";
import { Menu } from 'grommet-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidenav } from '../features/SidenavSlice'
import { isLogged, loggedUser } from '../features/LoggedSlice';
import { Button, Box, Grommet, Header, Nav, ResponsiveContext, Clock } from 'grommet';
const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

const CollapsableNav = () => {

    const dispatch = useDispatch()
    const logged = useSelector(isLogged)
    const loggeduser = useSelector(loggedUser)
    let isStaff = logged ? jwt_decode(localStorage.getItem('tokens')).staff : null
    let isAdmin = logged ? jwt_decode(localStorage.getItem('tokens')).admin : null

    return (
        <Grommet theme={theme} >
            <Header background="dark-1" pad="medium">
                <Box direction="row" align="center" gap="small">
                    <Link to="/"><Button color="brand" label="Flighter.com" /></Link>
                    {logged && <Link to={`/profile/${jwt_decode(localStorage.getItem("tokens")).user_id}`}><Button color="brand" label={loggeduser} /></Link>}
                    {isAdmin && <Link to={'/admin'}><Button color="brand" label="Admin Panel"/></Link>}
                </Box>
                <ResponsiveContext.Consumer align="center">
                    {(responsive) =>
                        responsive === 'small' ? (
                            <Menu onClick={() => dispatch(toggleSidenav())} />
                        ) : (
                            isStaff ? (
                            <Nav direction="row">
                                <Clock type="digital" style={{ position: "absolute", left: "50%" }} />
                                <Link to={`/manageflights/`}><Button color="brand" label="Manage My Flights" /></Link>
                                <Link to="/logout"><Button color="brand" label="Logout" /></Link>
                                </Nav>
                                )
                            :
                            (
                            <Nav direction="row">
                                <Clock type="digital" style={{ position: "absolute", left: "50%" }} />
                                <Link to="/flights"><Button color="brand" label="Flights" /></Link>
                                <Link to="/countries"><Button color="brand" label="Countries" /></Link>
                                {logged ? <Link to="/logout"><Button color="brand" label="Logout" /></Link> : <Link to="/login"><Button color="brand" label="Login" /></Link>}
                            </Nav>
                            )
                        )
                    }
                </ResponsiveContext.Consumer>
            </Header>
        </Grommet >
    )
};

export default CollapsableNav;