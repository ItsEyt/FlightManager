import { Box, Button, Nav, Sidebar } from 'grommet'
import { Flag, Globe, User } from 'grommet-icons'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { isLogged } from '../features/LoggedSlice'

const AdminPanel = () => {

    const navigate = useNavigate()
    const logged = useSelector(isLogged)

    const SidebarButton = ({ icon, label, ...rest }) => (
        <Box pad="small">
            <Button
                gap="medium"
                alignSelf="start"
                plain
                icon={icon}
                label={label}
                {...rest}
            />
        </Box>
    );

    const MainNavigation = () => (
        <Nav gap="large" responsive={false}>
            <SidebarButton icon={<User />} label="Users" onClick={() => navigate("/admin/users/")} />
            <SidebarButton icon={<Flag />} label="Countries" onClick={() => navigate("/admin/countries/")} />
            <SidebarButton icon={<Globe />} label="Flights" onClick={() => navigate("/admin/flights/")} />
        </Nav>
    )

    useEffect(() => {
        !logged && navigate("/login")
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <>
                <Box direction="row" height={{ min: '100%' }} style={{ display: "inline-block", verticalAlign: 'top', marginRight: '5px', zIndex: '1' }}>
                    <Sidebar
                        responsive={false}
                        background="#eeeeff"
                        header="Admin Panel"
                        pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
                    >
                        <MainNavigation />
                    </Sidebar>
                </Box>
                <div style={{ display: "inline-block" }}>
                    <Outlet />
                </div>
            </>
        </>
    )
}

export default AdminPanel