import { Button } from 'grommet'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteCountry } from '../features/CountrySlice'
import { changeModal } from '../features/ModalSlice'
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const CountryModal = ({ country }) => {

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
        state && dispatch(deleteCountry(country._id))
        dispatch(changeModal())
    }

    return (
        <FadeInDiv>
            <div style={styler}>
                Are you sure you want to delete <b>{country.name}</b>?
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

export default CountryModal