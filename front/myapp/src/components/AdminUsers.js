import { Box, Button, Pagination, Spinner, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeModal, showModal } from '../features/ModalSlice'
import { fetchProfiles, recoverProfile, showProfiles } from '../features/UserSlice'
import UserModal from './UserModal'

const AdminUsers = () => {

    // ! needs to adapt the users slice and implement here
    // ? still not working

    const dispatch = useDispatch()
    const users = useSelector(showProfiles)
    const [indices, setIndices] = useState([0, 10])
    const [currentUsers, setCurrentUsers] = useState([])
    const [selected, setselected] = useState()
    const modal = useSelector(showModal)

    const handleModal = async (id) => {
        setselected(id)
        dispatch(changeModal())
    }

    const handleChange = ({ startIndex, endIndex }) => {
        const nextUsers = users.value.slice(startIndex, endIndex)
        setCurrentUsers(nextUsers)
        setIndices([startIndex, Math.min(endIndex, users.value.length)])
    }

    useEffect(() => {
        dispatch(fetchProfiles())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setCurrentUsers(users.value.slice(0, 10))
    }, [users])

    return (
        <div>
            {modal && <UserModal user={users.value.find(user => user.id === selected)} />}
            {users.loading ? <Spinner /> :
                <>
                    <Table style={{minWidth: "100%"}} >
                        <TableHeader>
                            <TableRow>
                                <TableCell scope='col' border="bottom" align='center'>User ID</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Role</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Username</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Full name</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Email</TableCell>
                                <TableCell scope='col' border="bottom" align='center'>Active</TableCell>
                                <TableCell scope='col' border="bottom"></TableCell>
                                <TableCell scope='col' border="bottom"></TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentUsers?.map((user, ind) =>
                                <TableRow key={user.id} style={{ background: `${ind % 2 === 0 ? '#eeeeee' : ''}` }}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell align='center'>{user.user_role.role_name}</TableCell>
                                    <TableCell align='center'>{user.username}</TableCell>
                                    <TableCell align='center'>{user.firstname} {user.lastname}</TableCell>
                                    <TableCell align='center'>{user.email}</TableCell>
                                    <TableCell align='center' style={user.is_active ? { color: "blue" } : { color: "red" }}>{user.is_active ? "Active" : "Deleted"}</TableCell>
                                    <TableCell><Button label='Edit' primary color={"lightgreen"} /></TableCell>
                                    <TableCell>
                                        {user.is_active ?
                                            <Button label='Delete' primary color={"red"} style={{ color: 'white' }} onClick={() => handleModal(user.id)} />
                                            :
                                            <Button label='Recover' primary color={"blue"} style={{ color: 'white' }} onClick={()=> dispatch(recoverProfile(user.id))} />
                                    }
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                    <Box align="center" direction="row" justify="between">
                        <Text>
                            Showing {indices[0] + 1} - {users.value.length < 10 ? users.value.length : indices[1]} of {users.value.length}
                        </Text>
                        <Pagination numberItems={users.value.length} onChange={handleChange} />
                    </Box>


                </>
            }
        </div>
    )
}

export default AdminUsers