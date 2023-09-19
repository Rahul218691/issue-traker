import React from 'react'
import { FaFlag, FaComment } from 'react-icons/fa6'

import DashboardWrapper from '../../components/wrapper'
import RowActions from '../../components/tableView/RowActions'
import { ROW_ACTION_TYPES } from '../../helpers/Constants'
import styles from './kanban.module.css'
import { BOARD_DATA } from './mockData'

const KanbanBoard = () => {
  return (
    <DashboardWrapper>
      <main className={styles.kanban_board}>
        <div className={styles.kanban_wrapper}>
          {
            BOARD_DATA.map((column) => (
              <div className={styles.kanban_column} key={column.id}>
                <div className={styles.kanban_column_heading}>
                  <h2 className={styles.kanban_column_heading_title}>{column.title}</h2>
                </div>
                {
                  column.tasks.map((task) => (
                    <div className={styles.kanban_task} draggable key={task.id}>
                      <div className={styles.kanban_task_tags}>
                        {
                          task.tags.map((tag, index) => (
                            <span key={index} className={styles.task_tag}>{tag}</span>
                          ))
                        }
                        <RowActions
                          actionsConfig={[ROW_ACTION_TYPES.EDIT, ROW_ACTION_TYPES.DELETE]}
                          onSelect={() => { }}
                        />
                      </div>
                      <p>{task.title}</p>
                      <div className={styles.task_stats}>
                        <span><FaFlag />{task.created_at}</span>
                        <span><FaComment />{task.comments}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }

        </div>
      </main>
    </DashboardWrapper>
  )
}

export default KanbanBoard