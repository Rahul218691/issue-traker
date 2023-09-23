import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FaTags } from 'react-icons/fa6'
import { AiOutlineClose } from 'react-icons/ai'

import InputField from '../../components/InputField'
import ReactSelect from '../../components/reactSelect/ReactSelect'
import { PRIORITY_OPTIONS } from './config'

import AssigneeSelect from '../../components/reactSelect/AssigneeSelect'
import { PROJECT_CATEGORY_OPTIONS } from '../projects/config'
import styles from './kanban.module.css'

const TaskCreateForm = ({
    taskDetails = {},
    tag,
    attachments = [],
    onChangeDetails = () => { },
    onSetTag = () => { },
    onRemoveFile = () => { },
    onRemoveTag = () => { },
    onFileInputChange = () => { },
    onCreateTag = () => { }
}) => {
    return (
        <Row>
            <Col md={6}>
                <InputField
                    id="title"
                    name="title"
                    isLabelRequired
                    isRequired
                    type='text'
                    // errors={errors}
                    inputLabel='Title'
                    placeholder='Title'
                    value={taskDetails.title}
                    onChangeInput={onChangeDetails}
                />
            </Col>
            <Col md={6}>
                <InputField
                    id="description"
                    name="description"
                    isLabelRequired
                    isRequired
                    type='textarea'
                    // errors={errors}
                    inputLabel='Task Description'
                    placeholder='Task Description'
                    value={taskDetails.description}
                    onChangeInput={onChangeDetails}
                />
            </Col>
            <Col md={6}>
                <h5><FaTags /> Tags</h5>
                {
                    taskDetails.tags && taskDetails.tags.map((tag, index) => (
                        <span key={`tag-${index}`} className={styles.task_tag}>{tag} <b><AiOutlineClose onClick={() => onRemoveTag(index)} className='font_icons' /></b></span>
                    ))
                }
                <InputField
                    id="tag"
                    name="tag"
                    type='text'
                    placeholder='tag'
                    value={tag}
                    onChangeInput={(e) => onSetTag(e.target.value)}
                />
                <Button onClick={onCreateTag}>Add Tags</Button>
            </Col>
            <Col md={6}>
                <ReactSelect
                    id="priority"
                    name="priority"
                    isLabelRequired
                    isRequired
                    labelText='Priority'
                    isClearable
                    placeholder={'Choose Priority'}
                    value={taskDetails.priority}
                    getOptionLabel={e => e.text}
                    getOptionValue={e => e.value}
                    options={PRIORITY_OPTIONS || []}
                    onSelect={onChangeDetails}
                />
            </Col>
            <Col md={6}>
                <InputField
                    type='file'
                    name="attachments"
                    id="attachments"
                    isLabelRequired
                    inputLabel='Attachments'
                    multiple
                    onChangeInput={onFileInputChange}
                />
                <div>
                    {
                        !!attachments.length && <b>Selected Attachments</b>
                    }
                    {
                        attachments.map((file, index) => (
                            <p key={`file-${index}`}>{file.name} <span><AiOutlineClose onClick={() => onRemoveFile(index)} className='font_icons' color='crimson' /></span></p>
                        ))
                    }
                </div>
            </Col>
            <Col md={6}>
                <ReactSelect
                    id="taskStatus"
                    name="taskStatus"
                    isLabelRequired
                    isRequired
                    labelText='Task Status'
                    isClearable
                    placeholder={'Choose taskStatus'}
                    value={taskDetails.taskStatus}
                    getOptionLabel={e => e.text}
                    getOptionValue={e => e.value}
                    options={[]}
                    onSelect={onChangeDetails}
                />
            </Col>
            <Col md={6}>
                <AssigneeSelect
                    id="assignee"
                    name="assignee"
                    value={taskDetails.assignee}
                    isLabelRequired
                    labelText={'Assign To'}
                    isRequired
                    // errors={errors}
                    placeholder='Assign To'
                    onSelect={onChangeDetails}
                />
            </Col>
            <Col md={6}>
                <ReactSelect
                    id="taskCategory"
                    name="taskCategory"
                    isLabelRequired
                    isRequired
                    labelText='Task Category'
                    isClearable
                    placeholder={'Choose category'}
                    value={taskDetails.taskCategory}
                    getOptionLabel={e => e.label}
                    getOptionValue={e => e.value}
                    options={PROJECT_CATEGORY_OPTIONS}
                    onSelect={onChangeDetails}
                />
            </Col>
        </Row>
    )
}

export default TaskCreateForm