import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { falseLogin } from '../features/LoggedSlice'

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem("tokens", "")
        dispatch(falseLogin())
        setTimeout(() => { navigate("/") }, 2000)
        // eslint-disable-next-line
    }, [])

    return (
        <div>Succesfully logged out! Redirecting...</div>
    )
}

export default Logout