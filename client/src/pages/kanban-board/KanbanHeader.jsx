import React from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import ProjectSelect from '../../components/reactSelect/ProjectSelect'

import styles from './kanban.module.css'

const KanbanHeader = ({
  project,
  isDisableSelect,
  onToggleTaskModal = () => { },
  onSetProject = () => { }
}) => {
  return (
    <Card className={styles.kanban_board_header}>
        <CardBody>
            <Row>
                <Col md={8} className='mb-2'>
                    <ProjectSelect 
                      id="project"
                      name="project"
                      value={project}
                      isDisabled={isDisableSelect}
                      labelText={'Select Project'}
                      placeholder='Select Project'
                      onSelect={onSetProject}
                    />
                </Col>
                <Col md={2} className='mb-2'>
                  <Button disabled={!project} color='primary' onClick={onToggleTaskModal}>New Task</Button>
                </Col>
                <Col md={2} className='mb-2'>
                  <Button>Filters</Button>
                </Col>
            </Row>
        </CardBody>
    </Card>
  )
}

export default KanbanHeader