import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

import { AuthContext } from '../../context/AuthContextProvider'
import DashboardWrapper from '../../components/wrapper'
import { BOARD_DATA } from './mockData'
import KanbanTasks from './KanbanTasks'
import KanbanModal from './KanbanModal'
import KanbanHeader from './KanbanHeader'

import styles from './kanban.module.css'
import { ROLE_LIST } from '../../helpers/Constants'

const KanbanBoard = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const { state } = useContext(AuthContext)

  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false)
  const [isNewTask, setIsNewTask] = useState(true)
  const [selectedTask, setSelectedTask] = useState(null)
  const [project, setProject] = useState(null)

  const handleSelectTask = useCallback((task) => {
    setIsOpenTaskModal(true)
    setIsNewTask(false)
    setSelectedTask(task)
  }, [])

  const handleCloseTaskModal = useCallback(() => {
    setSelectedTask(null)
    setIsOpenTaskModal(false)
    setIsNewTask(true)
  }, [])

  const handleToggleNewTask = useCallback(() => {
    setIsNewTask(true)
    setIsOpenTaskModal(true)
  }, [])

  const handleSelectProject = useCallback((e, id, selected) => {
    setProject(selected)
  }, [])

  useEffect(() => {
    if (location?.state) {
      setProject(location.state.project)
    }
  }, [])

  const handleRedirectToCreateBoard = useCallback(() => {
    if (project && project._id) {
      navigate(`/kanban/board/create/${project._id}`)
    }
  }, [project])

  return (
    <DashboardWrapper>
      {
        state?.user?.role === ROLE_LIST.ADMIN && <div className={styles.header}>
        <Button disabled={!project} color='primary' onClick={handleRedirectToCreateBoard}>Create Board</Button>
      </div>
      }
      <main className={styles.kanban_board}>
        <KanbanHeader 
          project={project}
          isDisableSelect={location?.state?.isDisableSelect}
          onSetProject={handleSelectProject}
          onToggleTaskModal={handleToggleNewTask}
        />
        {
          !project && <div className={styles.not_selected_text}>
            Please choose a project to load the board
          </div> 
        }
        {
          project && <div className={styles.kanban_wrapper}>
          {
            BOARD_DATA.map((column) => (
              <div className={styles.kanban_column} key={column.id}>
                <div className={styles.kanban_column_heading}>
                  <h2 className={styles.kanban_column_heading_title}>{column.title}</h2>
                </div>
                {
                  column.tasks.map((task) => (
                      <KanbanTasks
                        key={task.id}
                        task={task}
                        onSetSelectedTask={handleSelectTask}
                      />
                  ))
                }
              </div>
            ))
          }
          {
          <KanbanModal 
            isOpen={isOpenTaskModal}
            isNewTask={isNewTask}
            selectedTask={selectedTask}
            onToggle={handleCloseTaskModal}
          />
          }
        </div>
        }
      </main>
    </DashboardWrapper>
  )
}

export default KanbanBoard