import { Button } from 'grommet'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeModal } from '../features/ModalSlice'
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { deleteProfile } from '../features/UserSlice'

const UserModal = ({ user }) => {

    const dispatch = useDispatch()
    const fadeAnimation = keyframes`${fadeIn}`;
    const FadeInDiv = styled.div`animation: 1s ${fadeAnimation};`;

    let styler = {
        position: 'absolute',
        background: '#aeaeae',
        borderRadius: '10px',
        width: '40%',
        height: '20%',
        marginTop: '5px',
        padding: '10px',
    }

    const handleClick = (state) => {
        state && dispatch(deleteProfile(user.id))
        dispatch(changeModal())
    }

    return (
        <FadeInDiv>
            <div style={styler}>
                {console.log(user)}
                Are you sure you want to delete <b>{user.username}</b>?
                <br />
                <br />
                it will not show up for airliners OR customers
                <div style={{ animation: 'alternate', animationDuration: '5' }}>
                    <br />
                    <Button
                        label="cancel"
                        primary
                        onClick={() => handleClick(false)}
                        style={{ color: 'white', position: 'absolute', bottom: '10px' }}
                    />
                    <Button
                        label="confirm"
                        primary
                        onClick={() => handleClick(true)}
                        color={"red"}
                        style={{ color: 'white', position: 'absolute', right: '10px', bottom: '10px' }}
                    />
                </div>
            </div>
        </FadeInDiv>
    )
}

export default UserModal