import axios from 'axios'
import React, { useState } from 'react';
import { Box, Button, FileInput, Form, FormField } from 'grommet';

const ProfileEdit = () => {
    const SURL = 'http://127.0.0.1:8000/'
    const [fname, setFname] = useState("")
    const [lname, setlname] = useState("")
    const [credit, setCredit] = useState("")
    const [address, setAddress] = useState("")
    const [valid, setValid] = useState(false)
    const [phoneNum, setPhoneNum] = useState("")
    const [file, setFile] = useState(null)

    const UpdateProfile = async () => {
        await axios.put(`${SURL}updateprofile/`,
            {
                credit_card: credit,
                first_name: fname,
                last_name: lname,
                phone: phoneNum,
                address: address,
                profilePic: file,
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('tokens')}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => console.log(res))
            .catch((error) => {
                console.log(error)
            });
    }

    const Reset = () => {
        setFname("")
        setlname("")
        setAddress("")
    }

    return (
        // <Grommet theme={...}>
        <Box animation={{ "type": "fadeIn" }} fill align="center" pad="large">
            <Form
                encType="multipart/form-data"
                validate="change"
                onReset={() => Reset()}
                onSubmit={() => UpdateProfile()}
                onValidate={(validationResults) => {
                    setValid(validationResults.valid);
                }}
            >
                <Box>
                    {/* first name */}
                    <FormField
                        name="first name"
                        label="first name"
                        placeholder="first name"
                        value={fname}
                        onChange={event => setFname(event.target.value)}
                        validate={[
                            { regexp: /^[a-z]/i },
                            (Fname) => {
                                if (Fname && Fname.length < 2)
                                    return 'must be >2 character';
                                return undefined;
                            },
                        ]}
                    />
                </Box>
                <Box>
                    {/* last name */}
                    <FormField
                        name="last name"
                        label="last name"
                        placeholder="last name"
                        value={lname}
                        onChange={event => setlname(event.target.value)}
                        validate={[
                            { regexp: /^[a-z]/i },
                            (lname) => {
                                if (lname && lname.length < 2)
                                    return 'must be >2 character';
                                return undefined;
                            },
                        ]}
                    />
                </Box>
                <Box>
                    {/* address */}
                    <FormField
                        label="address"
                        name="address"
                        required
                        placeholder="address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </Box>
                <Box>
                    {/* phone number */}
                    <FormField
                        label="phone number"
                        name="phone number"
                        type={'tel'}
                        placeholder="0501234567"
                        value={phoneNum}
                        onChange={(event) => setPhoneNum(event.target.value)}
                        validate={[{ regexp: /^[0-9]/i },]}
                    />
                </Box>
                <Box>
                    {/* credit card number */}
                    <FormField
                        label="Credit card"
                        name="Credit card"
                        placeholder="4850 0000 0000 0012"
                        type={'number'}
                        value={credit}
                        onChange={(event) => setCredit(event.target.value)}
                        validate={[{ regexp: /^[0-9]/i },]}
                    />
                </Box>
                <Box>
                    <FileInput
                        name="ProfilePicture"
                        onChange={event => {
                            const fileList = event.target.files;
                            for (let i = 0; i < fileList.length; i += 1) {
                                setFile(fileList[i])
                                console.log(file)
                            }
                        }}
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

export default ProfileEdit;