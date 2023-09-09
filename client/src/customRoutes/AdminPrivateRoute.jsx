import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

const AdminPrivateRoute = ({ children }) => {

    const { state } = useContext(AuthContext)

    const isAuthorized = localStorage.getItem('isAuthorized') 

    if (!isAuthorized && state && !state?.user) {
        return <Navigate to='/' />
    } else if (isAuthorized && state && !state?.user?.role === "admin") {
        return <Navigate to='/' />
    } else {
        return children
    }
}

export default AdminPrivateRoute