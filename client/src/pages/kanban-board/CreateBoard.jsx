import React, { useCallback, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'reactstrap'
import { FaTrash } from 'react-icons/fa6'
import Skeleton from 'react-loading-skeleton'

import BreadCrumbItem from '../../components/BreadCrumb'
import DashboardWrapper from '../../components/wrapper'

import { breadCrumConfig } from './config'
import styles from './kanban.module.css'
import InputField from '../../components/InputField'

const CreateBoard = () => {

    const { projectId } = useParams()

    const dragItem = useRef()
    const dragOverItem = useRef()

    const [columns, setColumns] = useState([])
    const [title, setTitle] = useState('')

    const handleCreateColumn = useCallback(() => {
      const payload = {
        title
      }
      const clonedList = [...columns]
      clonedList.push(payload)
      setColumns(clonedList)
      setTitle('')
    }, [title, columns])

    const handleDragStart = useCallback((index) => {
      dragItem.current = index
    }, [])

    const handleDragEnter = useCallback((index) => {
      dragOverItem.current = index
    }, [])

    const handleDrop = useCallback(() => {
      const copyList = [...columns]
      const dragItemContent = copyList[dragItem.current]
      copyList.splice(dragItem.current, 1)
      copyList.splice(dragOverItem.current, 0, dragItemContent)
      dragItem.current = null
      dragOverItem.current = null
      setColumns(copyList)
    }, [columns])

    const handleRemoveColumn = useCallback((index) => {
      const clonedList = [...columns]
      clonedList.splice(index, 1)
      setColumns(clonedList)
    }, [columns])

    const handleSaveBoard = useCallback(() => {

    }, [])

  return (
    <DashboardWrapper>
        <BreadCrumbItem 
            breadCrumbConfig={breadCrumConfig}
        />
        <div className='table__add__data'>
            <div className='add__link__fields'>
                <div className={styles.board_save}>
                  <Button disabled={!projectId || !columns.length} color='primary' onClick={handleSaveBoard}>Save Board</Button>
                </div>
                <div className={styles.kanban_wrapper}>
                    {
                      !!columns.length && (
                          <>
                            {
                              columns.map((col, index) => (
                                <div draggable 
                                  style={{ cursor: "grabbing" }}
                                  onDragStart={() => handleDragStart(index)}
                                  onDragEnter={() => handleDragEnter(index)}
                                  onDragEnd={handleDrop}
                                  key={`col_index_${index}`}
                                >
                                <div className={styles.kanban_column_heading} key={`col_${index}`}>
                                  <h2 className={styles.kanban_column_heading_title}>{col.title} {' '} <span onClick={() => handleRemoveColumn(index)} className={styles.deleteColumn}><FaTrash /></span></h2>
                                </div>
                                <div className={styles.kanban_task}>
                                    <Skeleton height={150} count={index + 1}/>
                                </div>
                                </div>
                              ))
                            }                          
                          </>
                      )
                    }
                    <div className={styles.kanban_column}>
                        <div className={styles.createBoard}>
                            <InputField 
                              id='columnName'
                              name="columnName"
                              placeholder='column header'
                              value={title}
                              onChangeInput={(e) => setTitle(e.target.value)}
                            />
                            <Button disabled={!title || !projectId} className='mb-2' color='primary' onClick={handleCreateColumn}>Create New Column</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DashboardWrapper>
  )
}

export default CreateBoard