import React, { useCallback, useState } from 'react'
import { Button, Col } from 'reactstrap'
import { useDispatch } from 'react-redux'

import useAxios from '../../hooks/useAxios'

import DashboardWrapper from '../../components/wrapper'
import BreadCrumbItem from '../../components/BreadCrumb'
import InputField from '../../components/InputField'
import ReactSelect from '../../components/reactSelect/ReactSelect'
import AssigneeSelect from '../../components/reactSelect/AssigneeSelect'

import { breadCrumConfig, PROJECT_CATEGORY_OPTIONS } from './config'
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
        assignee: projectDetails.assignee.map((x) => { return { _id: x._id } }),
        projectLead: { _id: projectDetails.projectLead._id },
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
                      <AssigneeSelect 
                        id="assignee"
                        name="assignee"
                        value={projectDetails.assignee}
                        isMulti
                        isLabelRequired
                        labelText={'Assign To'}
                        isRequired
                        errors={errors}
                        placeholder='Assign To'
                        onSelect={handleChangeProjectDetails}
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