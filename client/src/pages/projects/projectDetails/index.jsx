import React from 'react'
import { Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'

import DashboardWrapper from '../../../components/wrapper'
import ProjectCard from '../ProjectCard'

const ProjectDetails = () => {

  const { id } = useParams()

  return (
    <DashboardWrapper>
        <Row>
            <Col md={7}>
                {/* <ProjectCard 
                  data={projectData}
                  isDetailView
                /> */}
            </Col>
            <Col md={5}>
            </Col>
        </Row>
    </DashboardWrapper>
  )
}

export default ProjectDetails