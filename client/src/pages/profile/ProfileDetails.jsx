import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Card, CardBody, Row, Col, Button } from 'reactstrap'

import styles from './profile.module.css'
import InputField from '../../components/InputField'

const ProfileDetails = ({
    loading,
    userDetails,
    isEditMode,
    onSetEditMode = () => { },
    onChangeUserDetails = () => { },
    onUpdateDetails = () => { },
    onCancelUpdate = () => { }
}) => {
    return (
        <Card className='mb-3'>
            <CardBody>
                <Row>
                    <Col md={3}>
                        <h6 className='mb-0'>Full Name</h6>
                    </Col>
                    {
                        !isEditMode ? <Col md={9} className='text-secondary'>
                        {loading ? <Skeleton /> : userDetails.username}
                    </Col> :
                    <Col md={9}>
                        <InputField 
                            id="updatedUsername"
                            name="updatedUsername"
                            type='text'
                            placeholder='user name'
                            value={userDetails.updatedUsername}
                            onChangeInput={onChangeUserDetails}
                        />
                    </Col>
                    }
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <h6 className='mb-0'>Email</h6>
                    </Col>
                    <Col md={9} className='text-secondary'>
                        {loading ? <Skeleton /> : userDetails.email}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <h6 className='mb-0'>Role</h6>
                    </Col>
                    <Col md={9} className='text-secondary'>
                        {loading ? <Skeleton /> : userDetails.role}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <h6 className='mb-0'>Contact Number</h6>
                    </Col>
                    {
                        !isEditMode ? 
                        <Col md={9} className='text-secondary'>
                            {loading ? <Skeleton /> : userDetails.phone}
                        </Col>
                        : (
                            <InputField 
                                id="updatedPhone"
                                name="updatedPhone"
                                placeholder='contact number'
                                type='number'
                                value={userDetails.updatedPhone}
                                onChangeInput={onChangeUserDetails}
                            />
                        )
                    }
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <h6 className='mb-0'>Address</h6>
                    </Col>
                    {
                        !isEditMode ? 
                        <Col md={9} className='text-secondary'>
                            {loading ? <Skeleton /> : userDetails.address}
                        </Col>
                        : (
                            <InputField 
                                id="updatedAddress"
                                name="updatedAddress"
                                placeholder='address'
                                type='textarea'
                                value={userDetails.updatedAddress}
                                onChangeInput={onChangeUserDetails}
                            />
                        )
                    }
                </Row>
                <hr />
                <Row>
                    <Col sm={12}>
                        {
                            !isEditMode ? 
                            <Button color='info' disabled={loading} onClick={onSetEditMode}>Edit</Button>
                            : (
                                <>
                                    <Button color='primary' onClick={onUpdateDetails}>Update Profile</Button>
                                    <Button color='warning' className={styles.cancel_btn} onClick={onCancelUpdate}>Cancel</Button>
                                </>
                            )
                        }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ProfileDetails