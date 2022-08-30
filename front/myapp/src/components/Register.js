import axios from 'axios'
import React, { useState } from 'react';
import { Hide, View } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Form, FormField, Text } from 'grommet';

const Register = () => {
    const navigate = useNavigate()
    const [pwd, setpwd] = useState("")
    const SURL = 'http://127.0.0.1:8000/'
    const [email, setemail] = useState("")
    const [valid, setValid] = useState(false)
    const [reveal, setReveal] = useState(false)
    const [username, setUsername] = useState("")
    const [pwdconfirm, setpwdconfirm] = useState("")
    const [revealconfirm, setRevealconfirm] = useState(false)

    const Signup = async () => {
        await axios.post(`${SURL}register/`, {
            username: username,
            password: pwd,
            email: email
        })
            .then(function (response) {
                navigate('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const Reset = () => {
        setpwd("")
        setemail("")
        setUsername("")
        setReveal(false)
        setpwdconfirm("")
        setRevealconfirm(false)
    }

    return (
        // Uncomment <Grommet> lines when using outside of storybook
        // <Grommet theme={...}>
        <Box animation={{ "type": "fadeIn" }} fill align="center" pad="large">
            <Form
                validate="change"
                onReset={() => Reset()}
                onSubmit={() => Signup()}
                onValidate={(validationResults) => {
                    setValid(validationResults.valid);
                }}
            >
                <Box>
                    {/* username */}
                    <FormField
                        required
                        name="Username"
                        label="Username"
                        placeholder="Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        validate={[
                            { regexp: /^[a-z]/i },
                            (Username) => {
                                if (Username && Username.length < 3)
                                    return 'must be >3 character';
                                return undefined;
                            },
                        ]}
                    />
                </Box>
                <Box>
                    {/* email */}
                    <FormField
                        type='email'
                        label="Email"
                        name="Email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                        validate={[
                            { regexp: /\S+@\S+\.\S+/ },
                        ]}
                    />
                </Box>
                <Box direction="row" justify="evenly" align="center">
                    {/* password */}
                    <FormField
                        info={<Text size='small'>between 8-24 characters with at least 1 letter and 1 number</Text>}
                        label="Password"
                        name="password"
                        required
                        type={reveal ? 'text' : 'password'}
                        placeholder="Password"
                        value={pwd}
                        onChange={(event) => setpwd(event.target.value)}
                        validate={[{ regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/ },
                        (password) => {
                            if (password === null) {
                                return 'passwords must match!'
                            }
                            return undefined;
                        }]}
                    />
                    <Button 
                        icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                        onClick={() => setReveal(!reveal)}
                    />
                </Box>
                <Box direction="row" justify="between" align="center">
                    {/* confirm password */}
                    <FormField
                        style={{width:'100%'}}
                        label="Confirm Password"
                        name="Confirm password"
                        required
                        placeholder="Confirm Password"
                        type={revealconfirm ? 'text' : 'password'}
                        value={pwdconfirm}
                        onChange={(event) => setpwdconfirm(event.target.value)}
                        validate={
                            (password) => {
                                if (password !== pwd) {
                                    return 'passwords must match!'
                                }
                                return undefined;
                            }}
                    />
                    <Button 
                        icon={revealconfirm ? <View size="medium" /> : <Hide size="medium" />}
                        onClick={() => setRevealconfirm(!revealconfirm)}
                    />
                </Box>
                <Box direction="row" justify="evenly" margin={{ top: 'medium' }}>
                    <Button type="reset" label="Reset" />
                    <Button type="submit" label="Update" disabled={!valid} primary />
                </Box>
            </Form>

        </Box>
        // </Grommet>
    );
};

export default Register;