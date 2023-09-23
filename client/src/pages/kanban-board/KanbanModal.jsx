import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'

import TaskCreateForm from './TaskCreateForm'
import TaskComments from './TaskComments'

import styles from './kanban.module.css'

const CREATE_TASK_DETAILS = {
    title: '',
    description: '',
    tags: [],
    priority: '',
    taskStatus: '',
    assignee: '',
    comments: []
}

const KanbanModal = ({
    isOpen = false,
    isNewTask = true,
    onToggle = () => { }
}) => {

    const [ taskDetails, setTaskDetails ] = useState(Object.assign({}, CREATE_TASK_DETAILS))
    const [tag, setTag] = useState('')
    const [comment, setComment] = useState('')
    const [attachments, setAttachments] = useState([])
    const [activeTab, setActiveTab] = useState(1)

    const handleChangeTaskDetails = useCallback((e, id, selected) => {
        const updatedDetails = Object.assign({}, taskDetails)
        if (e) {
            e.preventDefault()
            updatedDetails[id] = e.target.value
        } else {
            updatedDetails[id] = selected
        }
        setTaskDetails(updatedDetails)
    }, [taskDetails])

    const handleCreateTags = useCallback(() => {
        setTaskDetails(prev => ({
            ...prev,
            tags: [tag, ...prev.tags]
        }))
        setTag('')
    }, [tag])

    useEffect(() => {
        if (!isOpen) {
            setTag('')
            setTaskDetails(Object.assign({}, CREATE_TASK_DETAILS))
            setAttachments([])
            setComment('')
            setActiveTab(1)
        }
    }, [isOpen])

    const handleSelectFiles = useCallback((files) => {
        const uploaded = [...attachments]
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file)
            }
        })
        setAttachments(uploaded)
    }, [attachments])

    const handleFileEvent = useCallback((e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleSelectFiles(chosenFiles)
    }, [])

    const handleRemoveFile = useCallback((i) => {
        let filesArr = [...attachments]
        filesArr.splice(i, 1)
        setAttachments(filesArr)
    }, [attachments])

    const handleRemoveTags = useCallback((index) => {
        let tagsArr = [...taskDetails.tags]
        tagsArr.splice(index, 1)
        setTaskDetails(prev => ({
            ...prev,
            tags: tagsArr
        }))
    }, [taskDetails])

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab)
    }, [])

  return (
    <Modal isOpen={isOpen} toggle={onToggle} size='xl' backdrop='static' className='modal-dialog-slideout' zIndex={99999} scrollable>
        <ModalHeader toggle={onToggle}>
            {isNewTask ? 'Add Task': 'Update Task'}
        </ModalHeader>
        <ModalBody>
            {
                !isNewTask && <div className={styles.kanban_board_modal_lastUpdate}>
                <span>Last Updated By: <b>Rahul Madathil</b></span>
            </div>
            }
            <div className={styles.modalTabs}>
                <Button color={activeTab === 1 ? 'primary' : 'secondary'} onClick={() => handleTabChange(1)}>Details</Button>
                <Button color={activeTab === 2 ? 'primary' : 'secondary'} onClick={() => handleTabChange(2)}>Comments</Button>
            </div>
            {
                activeTab === 1 ? <TaskCreateForm 
                taskDetails={taskDetails}
                tag={tag}
                attachments={attachments}
                onChangeDetails={handleChangeTaskDetails}
                onSetTag={setTag}
                onRemoveFile={handleRemoveFile}
                onRemoveTag={handleRemoveTags}
                onFileInputChange={handleFileEvent}
                onCreateTag={handleCreateTags}
            /> : <TaskComments 
                comment={comment}
                onSetComment={setComment}
                styles={styles}
            />
            }
        </ModalBody>
        <ModalFooter>
            <Button color='primary'>Create</Button> {' '}
            <Button color='danger' onClick={onToggle}>Close</Button>
        </ModalFooter>
    </Modal>
  )
}

export default KanbanModal