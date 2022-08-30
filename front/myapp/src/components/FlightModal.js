import { Button } from 'grommet'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteFlight } from '../features/FlightSlice'
import { changeModal } from '../features/ModalSlice'
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FlightModal = ({ flight }) => {

    const dispatch = useDispatch()
    const fadeAnimation = keyframes`${fadeIn}`;
    const FadeInDiv = styled.div`animation: 1s ${fadeAnimation};`;

    let styler = {
        position: 'absolute',
        background: '#aeaeae',
        borderRadius: '10px',
        width: '40%',
        height: '50%',
        marginTop: '5px',
        padding: '10px',
    }

    const handleClick = (state) => {
        state && dispatch(deleteFlight(flight.id))
        dispatch(changeModal())
    }

    return (
        <FadeInDiv>
            <div style={styler}>
                Are you sure you want to delete flight number <b>{flight.id}</b>?
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

export default FlightModal