import React, { useReducer, createContext } from 'react'
import { encryptData } from '../utils'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOG_IN_USER':
            window.localStorage.setItem('isAuthorized', true)
            encryptData('user', action.payload)
            const filterData = ({ userSlug, ...rest }) => rest
		    const payload = filterData(action.payload.user)
            return { ...state, user: payload, access_token: action.payload.access_token }
        default:
            return state
    }
}

const initialState = {
    user: null,
    access_token: null
}

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState)
  
  const value = { state, dispatch }

  return <AuthContext.Provider value={value}>
      {children}
  </AuthContext.Provider>
}

export { AuthContext, AuthProvider }