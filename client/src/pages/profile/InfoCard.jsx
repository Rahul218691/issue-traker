import React, { useRef, useCallback, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Button, Card, CardBody } from 'reactstrap'
import { toast } from 'react-toastify'

import { imageValidations } from '../../utils/index'

const InfoCard = ({
    loading,
    userDetails,
    isEditMode,
    previewUrl,
    onSetUpdatedProfile = () => { }
}) => {

    const InputRef = useRef()

    const handleChooseFile = useCallback(() => {
        if (InputRef) {
            InputRef.current.click()
        }
    }, [InputRef])

    const handleChangeInput = useCallback((e) => {
        e.preventDefault()
        let file = e.target.files[0]
        const validate = imageValidations(file)
        if (!validate) return toast.error('Please Choose png or jpeg images')
        onSetUpdatedProfile(file)
    }, [onSetUpdatedProfile])

    return (
        <Card>
            <CardBody>
                <div className='d-flex flex-column align-items-center text-center'>
                    {
                        loading ? (
                            <>
                                <Skeleton circle width={150} height={150} />
                                <div className='mt-3'>
                                    <Skeleton count={3} />
                                </div>
                            </>
                        ) : (
                            <>
                                <img src={previewUrl ? previewUrl : userDetails.profile} alt="Profile" crossOrigin='Anonymous' className="rounded-circle profile_image" width="150" />
                                {
                                    isEditMode && (
                                        <>
                                            <Button className='mt-2' color='primary' onClick={handleChooseFile}>Update Profile</Button>
                                            <input 
                                                type='file'
                                                className='hiiden_file_input'
                                                accept="image/png, image/jpeg" 
                                                ref={InputRef}
                                                onChange={handleChangeInput}
                                            />
                                        </>
                                    )
                                }
                                <div className='mt-3'>
                                    <h4>{userDetails.username}</h4>
                                    <p className="text-secondary mb-1">{userDetails.designation}</p>
                                    <p className="text-muted font-size-sm">{userDetails.address}</p>
                                </div>
                            </>
                        )
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default InfoCard