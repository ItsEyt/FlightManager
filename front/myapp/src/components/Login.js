import axios from 'axios'
import React, { useState } from 'react'
import { Hide, View } from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Grommet, TextInput } from 'grommet'
import { Link, useNavigate } from 'react-router-dom';
import { isLogged, trueLogin } from '../features/LoggedSlice';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [pwd, setpwd] = useState("")
    const logged = useSelector(isLogged)
    const SURL = 'http://127.0.0.1:8000/'
    const [reveal, setReveal] = useState(false)
    const [username, setUsername] = useState("")
    const [err, seterr] = useState("")

    const login = async () => {
        await axios.post(`${SURL}login/`, {
            username: username,
            password: pwd
        })
            .then(function (response) {
                localStorage.setItem('tokens', response.data.access);
                dispatch(trueLogin())
            })
            .catch(function (error) {
                seterr(error.response.data.detail)
                console.log(error.response.data.detail);
            });
        
        
    }

    const theme = {
        global: {
            font: {
                family: 'Roboto',
                size: '18px',
                height: '20px',
            },
        },
    };

    return (
        <Grommet theme={theme}>
            {logged ? navigate(-1) :
                <div>
                    {err.length > 1 && <div>{err}</div>}
                    <Box animation={{ "type": "fadeIn" }} fill align="center" justify="start" pad="large">
                        <Box width="medium" align="center">
                            Username:
                            <Box
                                width="medium"
                                direction="row"
                                margin="small"
                                align="center"
                                round="small"
                                border
                            >
                                <TextInput
                                    plain
                                    placeholder="Username"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                /> <br />
                            </Box>
                            Password:
                            <Box
                                width="medium"
                                direction="row"
                                margin="small"
                                align="center"
                                round="small"
                                border
                            >
                                <TextInput
                                    plain
                                    placeholder="Password"
                                    type={reveal ? 'text' : 'password'}
                                    value={pwd}
                                    onChange={(event) => setpwd(event.target.value)}
                                />
                                <Button
                                    icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                    onClick={() => setReveal(!reveal)}
                                /> <br />
                            </Box>
                            <Box >
                                <Button label="Login" onClick={() => login()} />
                            </Box>
                        </Box>
                        <Link to='/register' style={{marginTop:'2%'}}>Don't have an account? Sign up</Link>
                    </Box>
                </div>}
        </Grommet>
    )
}

export default Login