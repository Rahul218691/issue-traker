import React, { useCallback } from 'react'
import { FaFlag, FaComment } from 'react-icons/fa6'

import RowActions from '../../components/tableView/RowActions'
import { ROW_ACTION_TYPES } from '../../helpers/Constants'
import styles from './kanban.module.css'

const KanbanTasks = ({
    task = {},
    onSetSelectedTask = () => { }
}) => {

    const handleSetSelectedTask = useCallback(() => {
        onSetSelectedTask(task)
    }, [task, onSetSelectedTask])

    return (
        <div className={styles.kanban_task} draggable>
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
            <p className={styles.task_link_title} onClick={handleSetSelectedTask}>{task.title}</p>
            <div className={styles.task_stats}>
                <span><FaFlag />{task.created_at}</span>
                <span><FaComment />{task.comments}</span>
            </div>
        </div>
    )
}

export default KanbanTasks