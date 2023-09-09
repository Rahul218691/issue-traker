import React, { useCallback, useMemo, useState, useContext, useEffect } from 'react'
import { Button, Card, CardBody, CardText, Form, FormGroup, Input, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import { AuthContext } from '../../context/AuthContextProvider'
import { APP_CONFIGS } from '../../config'
import styles from './login.module.css'

const LOGIN_DETAILS = {
  email: '',
  password: ''
}

const Login = () => {

  const navigate = useNavigate()
  const { state, dispatch } = useContext(AuthContext)

  const [loginDetails, setLoginDetails] = useState(Object.assign({}, LOGIN_DETAILS))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (state.user && state.access_token) {
      return navigate('/home')
    }
  }, [navigate, state])

  const isDisabled = useMemo(() => {
    if (!loginDetails.email || !loginDetails.password || loading) {
      return true
    }
    return false
  }, [loginDetails, loading])

  const handleChangeLoginDetails = useCallback((event) => {
    event.preventDefault()
    const updatedResult = Object.assign({}, loginDetails)
    updatedResult[event.target.id] = event.target.value
    setLoginDetails(updatedResult)
  }, [loginDetails])

  const handleUserLogin = useCallback(async(event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(`${APP_CONFIGS.API_BASE_URL}/api/login`, loginDetails)
      dispatch({
				type: 'LOG_IN_USER',
				payload: data
			})
      toast.success(data.msg)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.msg)
      setLoading(false)
    }
  }, [loginDetails, dispatch])

  return (
    <Card className={styles.login_wrapper}>
      <CardBody>
        <CardText tag={'h2'} className={styles.card_header}>
          <i className='bx bxs-bug'></i> BugZilla
        </CardText>
        <Form onSubmit={handleUserLogin}>
          <FormGroup>
            <Label>Email<span className='required__asterisk'>*</span></Label>
            <Input
              type='email'
              placeholder='email'
              required
              id="email"
              value={loginDetails.email}
              onChange={handleChangeLoginDetails}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password<span className='required__asterisk'>*</span></Label>
            <Input
              type='password'
              placeholder='******'
              required
              id="password"
              value={loginDetails.password}
              onChange={handleChangeLoginDetails}
            />
          </FormGroup>
          <Button disabled={isDisabled} color='primary' block type='submit'>
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default Login