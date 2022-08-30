import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux'
import { Ticket, User } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { loggedUser } from '../features/LoggedSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Grid, Tab, Tabs, Text } from 'grommet'
import TicketPagination from './TicketPagination';

const Profile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const loggeduser = useSelector(loggedUser)
    const [profile, setProfile] = useState(null)
    const URL_PROFILE = "http://127.0.0.1:8000/profile/"
    const token = localStorage.getItem('tokens') ? localStorage.getItem('tokens') : null

    useEffect(() => {
        const fetchProfile = () => {
            axios.get(URL_PROFILE + id).then(res => setProfile(res.data))
        }
        fetchProfile()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {profile &&
                <Tabs>
                    <Tab title="Profile Information" icon={<User />}>
                        <Grid
                            style={{ marginLeft: '1%' }}
                            rows={['xsmall', 'auto', 'xsmall']}
                            columns={['flex', 'small']}
                            gap="small"
                            areas={[
                                { name: 'header', start: [0, 0], end: [1, 0] },
                                { name: 'editbutton', start: [1, 0], end: [1, 0] },
                                { name: 'info', start: [0, 1], end: [1, 2] },
                            ]}
                        >
                            <Box gridArea="main" background="light-2" />
                            <Box gridArea="header" direction="row" gap="small" margin='5px' background="brand">
                                <Avatar style={{ alignSelf: 'center', marginLeft: '15px' }} src={`http://127.0.0.1:8000${profile.profilePic}`} />
                                <Text style={{ alignSelf: 'center', marginLeft: '10px' }} size='xlarge' margin='5px'>{loggeduser}</Text>
                            </Box>
                            <Box gridArea='editbutton'>
                                <Button onClick={() => navigate('/editprofile')} margin='auto' color="brand" primary label="Edit profile" />
                            </Box>
                            <Box gridArea="info" background="light-5" direction="column" gap="small" margin='5px' pad="5px">
                                <>
                                    <h4>Address</h4>
                                    <span>{profile.address}</span>
                                    <br />
                                    <h4>Name</h4>
                                    <span>{profile.firstname} {profile.lastname}</span>
                                    <br />
                                    <h4>User role</h4>
                                    <span>{profile.user_role?.role_name}</span>
                                    <br />
                                    <h4>Contact</h4>
                                    <span><b>Phone:</b> {profile.phone_number}</span>
                                    <br />
                                    <span><b>Email:</b> {profile.email}</span>

                                </>
                                {/* // {credit_card_number} */}
                            </Box>
                        </Grid>
                    </Tab>
                    {token && jwt_decode(token).user_id === Number(id) ?
                        <Tab title="My Tickets" icon={<Ticket />}>
                            {<TicketPagination />}
                        </Tab> : null}
                </Tabs>
            }
        </div>
    )
}

export default Profile