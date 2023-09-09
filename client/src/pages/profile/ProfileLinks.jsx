import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'reactstrap'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import Skeleton from 'react-loading-skeleton'
import InputField from '../../components/InputField'

const ProfileLinks = ({
    loading,
    userDetails,
    isEditMode,
    onChangeUserDetails = () => { }
}) => {
    
    return loading ? (
        <Card className='mt-3'>
            <Skeleton count={3}/>
        </Card>
    ) : (
        <Card className='mt-3'>
            <ListGroup flush>
                <ListGroupItem className='d-flex justify-content-between align-items-center flex-wrap'>
                    <h6 className="mb-0 d-flex justify-content-between align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    {
                        !isEditMode ? <span className="text-secondary">{userDetails.websiteURL || '-'}</span> :
                        <InputField 
                            type='url'
                            placeholder='website url'
                            name="updatedwebsiteURL"
                            id="updatedwebsiteURL"
                            value={userDetails.updatedwebsiteURL}
                            onChangeInput={onChangeUserDetails}
                        />
                    }
                </ListGroupItem>
            </ListGroup>
            <ListGroup flush>
                <ListGroupItem className='d-flex justify-content-between align-items-center flex-wrap'>
                    <h6 className="mb-0 d-flex justify-content-between align-items-center"><FaLinkedin size={25} /> Linkedin</h6>
                    {
                        !isEditMode ? <span className="text-secondary">{userDetails.linkedinURL || '-'}</span> :
                        <InputField 
                            type='url'
                            placeholder='linkedin url'
                            name="updatedlinkedinURL"
                            id="updatedlinkedinURL"
                            value={userDetails.updatedlinkedinURL}
                            onChangeInput={onChangeUserDetails}
                        />
                    }
                </ListGroupItem>
            </ListGroup>
            <ListGroup flush>
                <ListGroupItem className='d-flex justify-content-between align-items-center flex-wrap'>
                    <h6 className="mb-0 d-flex justify-content-between align-items-center"><FaGithub size={25} /> Github</h6>
                    {
                        !isEditMode ? <span className="text-secondary">{userDetails.githubURL || '-'}</span> 
                        : <InputField 
                            type='url'
                            placeholder='github url'
                            name="updatedgithubURL"
                            id="updatedgithubURL"
                            value={userDetails.updatedgithubURL}
                            onChangeInput={onChangeUserDetails}
                        />
                    }
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default ProfileLinks