import React, { useState, useCallback } from 'react'
import { Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
 
import { userCreateValidate } from './helper'
import useAxios from '../../hooks/useAxios'
import InputField from '../../components/InputField'
import { createUser } from '../../services/userServices'

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    role: ''
}

const createUserForm = ({
    onCloseAddScreen = () => { },
    onFetchUsers = () => { }
}) => {

    const api = useAxios()

    const [userInfo, setUserInfo] = useState(Object.assign({}, INITIAL_STATE))
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChangeInput = useCallback((e, id) => {
        e.preventDefault()
        const updatedInfo = Object.assign({}, userInfo)
        updatedInfo[id] = e.target.value
        setUserInfo(updatedInfo)
    }, [userInfo])

    const handleResetUserInfo = useCallback(() => {
        setUserInfo(Object.assign({}, INITIAL_STATE))
    }, [])

    const handleCreateUser = useCallback(async() => {
        setLoading(true)
        const validate = userCreateValidate(userInfo)
        if (!!Object.keys(validate).length) {
            setErrors(validate)
            setLoading(false)
        } else {
            setErrors({})
            try {
                const response = await createUser(api, userInfo)
                handleResetUserInfo()
                toast.success(response.msg)
                onFetchUsers({ page: 1 })
                setLoading(false)
            } catch (error) {
                setLoading(false)
                toast.error(error?.response?.data?.msg)
            }
        }
    }, [userInfo, api, handleResetUserInfo, onFetchUsers])

    return (
        <div className='table__add__data'>
            <div className='add__data__header'>
                <h4>Create User</h4>
                <i className='bx bx-window-close' onClick={onCloseAddScreen}></i>
            </div>
            <div className='add__link__fields row'>
                <Col md={6}>
                    <InputField
                        id="username"
                        name='username'
                        isLabelRequired
                        isRequired
                        type='text'
                        inputLabel='UserName'
                        placeholder='User name'
                        errors={errors}
                        value={userInfo.username}
                        onChangeInput={handleChangeInput}
                    />
                </Col>
                <Col md={6}>
                    <InputField
                        id="email"
                        name='email'
                        isLabelRequired
                        isRequired
                        type='email'
                        inputLabel='Email'
                        placeholder='email'
                        errors={errors}
                        value={userInfo.email}
                        onChangeInput={handleChangeInput}
                    />
                </Col>
                <Col md={6}>
                    <InputField
                        id="password"
                        name='password'
                        isLabelRequired
                        isRequired
                        type='password'
                        inputLabel='Password'
                        placeholder='******'
                        errors={errors}
                        value={userInfo.password}
                        onChangeInput={handleChangeInput}
                    />
                </Col>
                <Col md={6}>
                    <InputField
                        id="role"
                        name='role'
                        isLabelRequired
                        isRequired
                        type='select'
                        inputLabel='Role'
                        placeholder='******'
                        errors={errors}
                        value={userInfo.role}
                        onChangeInput={handleChangeInput}
                    >
                        <option>Choose Role</option>
                        {/* <option>user</option> */}
                        <option>developer</option>
                    </InputField>
                </Col>
            </div>
            <Row className='form__buttons'>
                <button className='common__button' type='button' disabled={loading} onClick={handleResetUserInfo}>Clear</button>
                <button className='common__button' type='button' disabled={loading} onClick={handleCreateUser}>Create</button>
            </Row>
        </div>
    )
}

export default createUserForm