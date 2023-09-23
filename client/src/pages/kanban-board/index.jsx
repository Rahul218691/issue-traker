import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import DashboardWrapper from '../../components/wrapper'
import { BOARD_DATA } from './mockData'
import KanbanTasks from './KanbanTasks'
import KanbanModal from './KanbanModal'
import KanbanHeader from './KanbanHeader'

import styles from './kanban.module.css'

const KanbanBoard = () => {

  const location = useLocation()

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

  return (
    <DashboardWrapper>
      <main className={styles.kanban_board}>
        <KanbanHeader 
          project={project}
          isDisableSelect={location?.state?.isDisableSelect}
          onSetProject={handleSelectProject}
          onToggleTaskModal={handleToggleNewTask}
        />
        <div className={styles.kanban_wrapper}>
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
      </main>
    </DashboardWrapper>
  )
}

export default KanbanBoard