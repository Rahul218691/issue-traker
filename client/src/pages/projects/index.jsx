import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'reactstrap'

import useAxios from '../../hooks/useAxios'
import { fetchProjectListRequest } from '../../redux/actions/projectActions'

import DashboardWrapper from '../../components/wrapper'
import DataLoading from '../../components/DataLoading'
import ProjectCard from './ProjectCard'
import styles from './project.module.css'

const Projects = () => {

  const dispatch = useDispatch()
  const api = useAxios()
  const { items,
      pageNumber,
      pageSize } = useSelector(state => state.projects)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const handleRedirectToProjectSetup = useCallback(() => {
    navigate('/project/create')
  }, [navigate])

  const handleFetchProjects = useCallback(({
    page,
    size,
    search = ''
  }) => {
     setLoading(true)
     const searchVal = search ? search.trim() : ''
     const payload = {
        page: page || pageNumber,
        limit: size || pageSize,
        genericSearch: searchVal,
        instance: api
     }
     try {
      dispatch(fetchProjectListRequest(payload, () => {
        setLoading(false)
      }))
     } catch (error) {
      setLoading(false)
     }
  }, [pageNumber, pageSize, api])

  useEffect(() => {
    if (!items.length) {
      handleFetchProjects({ page: 1 })
    }
  }, [items])

  return (
    <DashboardWrapper>
      <div className={styles.project_header}>
        <h2 className='page_header'>Projects</h2>
        <Button color='primary' disabled={loading} onClick={handleRedirectToProjectSetup}>Create Project</Button>
      </div>
        <div className={styles.project_wrapper}>
              {
                items.map((data) => (
                  <ProjectCard 
                    key={data._id}
                    data={data}
                  />
                ))
              }
          </div>
          {
            loading && <DataLoading />
          }
    </DashboardWrapper>
  )
}

export default Projects