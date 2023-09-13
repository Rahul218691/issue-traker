import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useAxios from '../../../hooks/useAxios'
import { getProjectDetailsRequest } from '../../../redux/actions/projectActions'
import DashboardWrapper from '../../../components/wrapper'
import ProjectCard from '../ProjectCard'

const ProjectDetails = () => {

  const dispatch = useDispatch()
  const api = useAxios()
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [projectDetail, setProjectDetail] = useState({})

  useEffect(() => {
    if (id) {
      setLoading(true)
      const payload = {
        instance: api,
        id
      }
      try {
        dispatch(getProjectDetailsRequest(payload, (res) => {
          if (res) {
            setProjectDetail(res)
            setLoading(false)
          }
        }))
      } catch (error) {
        setLoading(false)
      }
    }
  }, [id])

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [])

  return (
    <DashboardWrapper>
        <div className='mb-2'>
            <Button type='button' onClick={handleGoBack}>BACK</Button>
        </div>
        <Row>
            <Col md={7}>
                <ProjectCard 
                  data={projectDetail}
                  isDetailView
                  isLoading={loading}
                />
            </Col>
            <Col md={5}>
            </Col>
        </Row>
    </DashboardWrapper>
  )
}

export default ProjectDetails