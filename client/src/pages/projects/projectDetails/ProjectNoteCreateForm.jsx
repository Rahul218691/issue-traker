import React, { useCallback, useState } from 'react'
import { Button, Col } from 'reactstrap'
import { useDispatch } from 'react-redux'

import useAxios from '../../../hooks/useAxios'
import InputField from '../../../components/InputField'
import ReactSelect from '../../../components/reactSelect/ReactSelect'
import { validateNoteInfo } from './helper'
import { createNewProjectNoteRequest } from '../../../redux/actions/projectActions'

const NOTE_INIIAL_STATE = {
  note: '',
  mentions: []
}

const ProjectNoteCreateForm = ({
    projectId,
    options = [],
    onFetchNotes = () => { }
}) => {

  const dispatch = useDispatch()
  const api = useAxios()

  const [ noteInfo, setNoteInfo ] = useState(Object.assign({}, NOTE_INIIAL_STATE))
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChangeNoteDetails = useCallback((e, id, selected) => {
    const updatedNoteInfo = Object.assign({}, noteInfo)
    if(e) {
      e.preventDefault()
      updatedNoteInfo[id] = e.target.value
    } else {
      updatedNoteInfo[id] = selected
    }
    setNoteInfo(updatedNoteInfo)
  }, [noteInfo])

  const handleCreateNote = useCallback(() => {
    const validate = validateNoteInfo(noteInfo)
    if (!!Object.keys(validate).length) {
        setErrors(validate)
        setLoading(false)
    } else {
      setErrors({})
      const payload = {
        instance: api,
        projectId,
        ...noteInfo,
      }
      dispatch(createNewProjectNoteRequest(payload, () => {
        setLoading(false)
        setNoteInfo(Object.assign({}, NOTE_INIIAL_STATE))
        onFetchNotes({ page: 1 })
      }))
    }
  }, [noteInfo, api, projectId, onFetchNotes])

  return (
    <div className='table__add__data mt-0'>
        <div className='add__link__fields row'>
            <Col md={12}>
                <InputField 
                    id="note"
                    name="note"
                    isLabelRequired
                    isRequired
                    type='textarea'
                    rows={3}
                    errors={errors}
                    inputLabel='Note'
                    placeholder='Add Note Content...'
                    value={noteInfo.note}
                    onChangeInput={handleChangeNoteDetails}
                />
            </Col>
            <Col md={12}>
                    <ReactSelect 
                      id="mentions"
                      name="mentions"
                      isMulti
                      isLabelRequired
                      labelText='Mention Team Members (optional)'
                      isClearable
                      errors={errors}
                      placeholder="Team Members"
                      value={noteInfo.mentions}
                      getOptionLabel={e => e.username}
                      getOptionValue={e => e._id}
                      options={options}
                      onSelect={handleChangeNoteDetails}
                    />
            </Col>
            <Col>
                <Button disabled={loading} onClick={handleCreateNote} color='primary'>{!loading ? 'Add Note' : 'Please wait...'}</Button>
            </Col>
        </div>
    </div>
  )
}

export default ProjectNoteCreateForm