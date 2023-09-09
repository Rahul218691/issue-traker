import React, { useCallback, useState } from 'react'
import { Button, Col } from 'reactstrap'
import { useDispatch } from 'react-redux'

import useAxios from '../../hooks/useAxios'

import DashboardWrapper from '../../components/wrapper'
import BreadCrumbItem from '../../components/BreadCrumb'
import InputField from '../../components/InputField'
import ReactSelect from '../../components/reactSelect/ReactSelect'
import ReactAsyncSelect from '../../components/reactSelect/ReactAsyncSelect'

import { breadCrumConfig, PROJECT_CATEGORY_OPTIONS } from './config'
import { PAGE_SIZE_LIMIT } from '../../helpers/Constants'

import { getUsersList } from '../../services/userServices'
import { validateProjectDetails } from './helper'
import { createNewProjectRequest } from '../../redux/actions/projectActions'

const INITIAL_PROJECT_LIST = {
  title: '',
  description: '',
  category: [],
  assignee: [],
  startDate: '',
  projectLead: null
}


const CreateProject = () => {

  const dispatch = useDispatch()
  const api = useAxios()

  const [projectDetails, setProjectDetails] = useState(Object.assign({}, INITIAL_PROJECT_LIST))
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleLoadMore = useCallback(async(searchQuery, loadedOptions, { page }) => {
    try {
      const payload = {
        page,
        limit: PAGE_SIZE_LIMIT,
        genericSearch: searchQuery,
        isDDL: true
      }
        const response = await getUsersList(api, payload)
        return {
          options: response.data,
          hasMore: response.hasNextPage,
          additional: {
            page: searchQuery ? 2 : page + 1
          }
        }
    } catch (error) {
      console.log(error)
    }
  }, [api])

  const handleChangeProjectDetails = useCallback((e, id, selected) => {
    const updatedProjectInfo = Object.assign({}, projectDetails)
    if(e) {
      e.preventDefault()
      updatedProjectInfo[id] = e.target.value
    } else {
      if (id === 'assignee') {
        updatedProjectInfo['projectLead'] = null
      }
      updatedProjectInfo[id] = selected
    }
    setProjectDetails(updatedProjectInfo)
  }, [projectDetails])

  const handleClearForm = useCallback(() => {
    setProjectDetails(Object.assign({}, INITIAL_PROJECT_LIST))
  }, [])
 
  const handleCreateProject = useCallback(async() => {
    setLoading(true)
    const validate = validateProjectDetails(projectDetails)
    if (!!Object.keys(validate).length) {
        setErrors(validate)
        setLoading(false)
    } else {
      setErrors({})
      const payload = {
        ...projectDetails,
        instance: api
      }
      dispatch(createNewProjectRequest(payload, (res) => {
          if (res) {
            handleClearForm()
          }
          setLoading(false)
      }))
    }
  }, [projectDetails, api, handleClearForm])

  return (
    <DashboardWrapper>
          <BreadCrumbItem 
              breadCrumbConfig={breadCrumConfig}
          />
          <div className='table__add__data'>
              <div className='add__link__fields row'>
                  <Col md={6}> 
                      <InputField 
                        id="title"
                        name="title"
                        isLabelRequired
                        isRequired
                        type='text'
                        errors={errors}
                        inputLabel='Project Title'
                        placeholder='Project Title'
                        value={projectDetails.title}
                        onChangeInput={handleChangeProjectDetails}
                      />
                  </Col>
                  <Col md={6}> 
                      <InputField 
                        id="description"
                        name="description"
                        isLabelRequired
                        isRequired
                        type='textarea'
                        errors={errors}
                        inputLabel='Project Description'
                        placeholder='Project Description'
                        value={projectDetails.description}
                        onChangeInput={handleChangeProjectDetails}
                      />
                  </Col>
                  <Col md={6}>
                    <ReactSelect 
                      id="category"
                      name="category"
                      isMulti
                      isLabelRequired
                      isRequired
                      labelText='Project Category'
                      isClearable
                      errors={errors}
                      placeholder="Choose Project Category"
                      value={projectDetails.category}
                      options={PROJECT_CATEGORY_OPTIONS}
                      onSelect={handleChangeProjectDetails}
                    />
                  </Col>
                  <Col md={6}>
                      <ReactAsyncSelect 
                        id="assignee"
                        name="assignee"
                        value={projectDetails.assignee}
                        isMulti
                        isLabelRequired
                        labelText={'Assign To'}
                        isRequired
                        errors={errors}
                        placeholder='Assign To'
                        getOptionLabel={e => e.username}
                        getOptionValue={e => e._id}
                        onSelect={handleChangeProjectDetails}
                        onLoadOptions={handleLoadMore}
                      />
                  </Col>
                  <Col md={6}>
                    <InputField 
                      id="startDate"
                      name="startDate"
                      type="date"
                      isLabelRequired
                      value={projectDetails.startDate}
                      inputLabel="Project Start Date"
                      isRequired
                      errors={errors}
                      placeholder="YYYY-MM-DD"
                      onChangeInput={handleChangeProjectDetails}
                    />
                  </Col>
                  {
                    !!projectDetails.assignee.length && <Col md={6}>
                    <ReactSelect 
                      id="projectLead"
                      name="projectLead"
                      isLabelRequired
                      isRequired
                      labelText='Project Lead'
                      isClearable
                      errors={errors}
                      placeholder="Choose Lead"
                      value={projectDetails.projectLead}
                      options={projectDetails.assignee}
                      getOptionLabel={e => e.username}
                      getOptionValue={e => e._id}
                      onSelect={handleChangeProjectDetails}
                    />
                  </Col>
                  }
              </div>
              <div className='mt-4'>
                <Button color='primary' disabled={loading} onClick={handleCreateProject} className='mb-2'>Create Project</Button>
                <Button className='clear_button mb-2' disabled={loading} color='warning' onClick={handleClearForm}>Clear</Button>
              </div>
          </div>
    </DashboardWrapper>
  )
}

export default CreateProject