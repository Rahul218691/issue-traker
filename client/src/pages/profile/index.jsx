import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { Row, Col } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthContext } from '../../context/AuthContextProvider'
import useAxios from '../../hooks/useAxios'
import InfoCard from './InfoCard'
import ProfileLinks from './ProfileLinks'
import ProfileDetails from './ProfileDetails'
import { getColumnConfig } from './TableConfig'
import DashboardWrapper from '../../components/wrapper'
import TableView from '../../components/tableView'
import { PAGE_SIZE_LIMIT } from '../../helpers/Constants'
import { MOCKDATA } from './mockData'

import { getUserProfile, updateUserProfile } from '../../services/userServices'

const INITIAL_PROJECT_LIST = {
  items: MOCKDATA,
  totalPages: 0,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  pageNumber: 1,
  pageSize: PAGE_SIZE_LIMIT
}

const INITIAL_USER_STATE = {
	phone: "",
  updatedPhone: "",
	address: "",
  updatedAddress: "",
	websiteURL: "",
  updatedwebsiteURL: "",
	linkedinURL: "",
  updatedlinkedinURL: "",
	githubURL: "",
  updatedgithubURL: "",
	designation: "",
	role: "",
	email: "",
	username: "",
  updatedUsername: "",
	profile: ""
}

const Profile = () => {

  const api = useAxios()
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useContext(AuthContext)

  const [userProjectList] = useState(Object.assign({}, INITIAL_PROJECT_LIST))
  const [userDetails, setUserDetails] = useState(Object.assign({}, INITIAL_USER_STATE))
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const [updatedImage, setUpdateImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const { items, pageSize, pageNumber, totalCount } = useMemo(() => userProjectList, [userProjectList])

  const columns = useMemo(() => {
    return getColumnConfig()
  }, [])

  const handleToggleEditMode = useCallback(() => {
    setEditMode(prev => !prev)
  }, [])

  const handleCancelUpdate = useCallback(() => {
    handleToggleEditMode()
    if (previewUrl) {
      window.URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setUpdateImage(null)
    setUserDetails({
      ...userDetails,
      updatedAddress: userDetails.address,
      updatedUsername: userDetails.username,
      updatedgithubURL: userDetails.githubURL,
      updatedlinkedinURL: userDetails.linkedinURL,
      updatedwebsiteURL: userDetails.websiteURL,
      updatedPhone: userDetails.phone
    })
  }, [previewUrl, userDetails, handleToggleEditMode])

  const handleSetUpdateImage = useCallback((file) => {
    setUpdateImage(file)
    if (previewUrl) {
      window.URL.revokeObjectURL(previewUrl)
    }
    const blobImg = window.URL.createObjectURL(file)
    setPreviewUrl(blobImg)
  }, [previewUrl])

  const handleFetchUserProfileDetails = useCallback(async() => {
    try {
      setLoadingProfile(true)
      const profileData = await getUserProfile(api, id)
      setUserDetails({
        ...userDetails,
        ...profileData,
        updatedAddress: profileData.address,
        updatedgithubURL: profileData.githubURL,
        updatedPhone: profileData.phone,
        updatedlinkedinURL: profileData.linkedinURL,
        updatedwebsiteURL: profileData.websiteURL,
        updatedUsername: profileData.username
      })
      setLoadingProfile(false)
    } catch (error) {
      toast.error('Failed to fetch user')
      navigate(-1)
    }
  }, [api, id, navigate])

  const handleChangeUserDetails = useCallback((e, id) => {
    e.preventDefault()
    const updatedInfo = Object.assign({}, userDetails)
    updatedInfo[id] = e.target.value
    setUserDetails(updatedInfo)
  }, [userDetails])

  const handleUpsertUserDetails = useCallback(async() => {
    if (isEditMode) {
      const formdata = new FormData()
      formdata.append('username', userDetails.updatedUsername)
      formdata.append('phone', userDetails.updatedPhone)
      formdata.append('address', userDetails.updatedAddress)
      formdata.append('websiteURL', userDetails.updatedwebsiteURL)
      formdata.append('linkedinURL', userDetails.updatedlinkedinURL)
      formdata.append('githubURL', userDetails.updatedgithubURL)
      formdata.append('profile', updatedImage)
      formdata.append('oldProfileImage', userDetails.profile)

      try {
        await updateUserProfile(api, formdata)
        handleFetchUserProfileDetails()
        handleCancelUpdate()
      } catch (error) {
        toast.error('Failed to update user info')
      }

    }
  }, [userDetails, isEditMode, updatedImage, api, handleCancelUpdate, handleFetchUserProfileDetails])

  useEffect(() => {
    if (id) {
      handleFetchUserProfileDetails()
    } else {
      return navigate(-1)
    }
  }, [id, navigate])

  return (
    <DashboardWrapper>
        <Row className='gutters-sm'>
          <Col md={4} className='mb-3'>
              <InfoCard userDetails={userDetails} loading={loadingProfile} isEditMode={isEditMode} previewUrl={previewUrl} onSetUpdatedProfile={handleSetUpdateImage} />
              <ProfileLinks userDetails={userDetails} loading={loadingProfile} isEditMode={isEditMode} onChangeUserDetails={handleChangeUserDetails} />
          </Col>
          <Col md={8}>
              <ProfileDetails userDetails={userDetails} loading={loadingProfile} isEditMode={isEditMode} onSetEditMode={handleToggleEditMode}
                onChangeUserDetails={handleChangeUserDetails}
                onUpdateDetails={handleUpsertUserDetails}
                onCancelUpdate={handleCancelUpdate}
              />
              {
                state && state.user && state.user.role !== 'admin' && <TableView 
                title={"Projects"}
                columns={columns}
                data={items}
                isGenericSearchRequired
                isPaginationRequired
                isServerSideGenericSearch
                currentPage={pageNumber}
                totalCount={totalCount}
                pageSize={pageSize}
                customStyle={{
                  'height': '350px',
                  'overflowY': 'scroll'
                }}
              />
              }
          </Col>
        </Row>
    </DashboardWrapper>
  )
}

export default Profile