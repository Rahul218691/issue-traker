import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

const PrivateRoute = ({ children }) => {

    const { state } = useContext(AuthContext)

    const isAuthorized = localStorage.getItem('isAuthorized') 

    if (!isAuthorized && state && !state?.user) {
        return <Navigate to='/' />
    } else {
        return children
    }
}

export default PrivateRoute