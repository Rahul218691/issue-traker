import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/AuthContextProvider'

import Home from './pages/home'
import Login from './pages/auth/Login'
import ManageUsers from './pages/users'
import UserProfile from './pages/profile'
import Projects from './pages/projects'
import KanbanBoard from './pages/kanban-board'
import ProjectDetails from './pages/projects/projectDetails'
import CreateProject from './pages/projects/CreateProject'
import CreateBoard from './pages/kanban-board/CreateBoard'
import { decryptData } from './utils'

// Private Routes
import AdminPrivateRoute from './customRoutes/AdminPrivateRoute'
import PrivateRoute from './customRoutes/PrivateRoute'

const App = () => {

  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    if (window.localStorage.getItem('isAuthorized') && window.localStorage.getItem('user')) {
      const data = decryptData('user')
      const filterData = ({ msg, ...rest }) => rest
      const payload = filterData(data)
      dispatch({
        type: 'LOG_IN_USER',
        payload
      })
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path='/users' element={<AdminPrivateRoute>
        <ManageUsers />
      </AdminPrivateRoute>} />
      <Route path='/user/profile/:id' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      <Route path='/projects' element={<PrivateRoute><Projects /></PrivateRoute>} />
      <Route path='/project/create' element={<AdminPrivateRoute><CreateProject /></AdminPrivateRoute>} />
      <Route path='/project/:id' element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
      <Route path='/kanban/board' element={<PrivateRoute><KanbanBoard /></PrivateRoute>} />
      <Route path='/kanban/board/create/:projectId' element={<AdminPrivateRoute><CreateBoard /></AdminPrivateRoute>} />
    </Routes>
  )
}

export default App