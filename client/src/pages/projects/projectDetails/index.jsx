import React, { useCallback, useEffect, useState, useMemo, useContext } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'
import Skeleton from 'react-loading-skeleton'

import { AuthContext } from '../../../context/AuthContextProvider'
import useAxios from '../../../hooks/useAxios'
import { getProjectDetailsRequest, getProjectNotesRequest, deleteProjectNoteRequest } from '../../../redux/actions/projectActions'
import DashboardWrapper from '../../../components/wrapper'
import ProjectCard from '../ProjectCard'
import ProjectNoteCreateForm from './ProjectNoteCreateForm'
import NoteItem from '../../../components/noteItem'
import styles from './details.module.css'
import { ROLE_LIST } from '../../../helpers/Constants'

const initialState = {
  items: [],
  totalPages: 0,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  pageNumber: 1,
  pageSize: 3
}

const ProjectDetails = () => {

  const dispatch = useDispatch()
  const api = useAxios()
  const { state: { user } } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [projectDetail, setProjectDetail] = useState({})
  const [projectNotes, setProjectNotes] = useState(Object.assign({}, initialState))
  const [notesLoading, setNotesLoading] = useState(false)

  const { items, pageSize, pageNumber, hasNextPage, hasPreviousPage } = useMemo(() => projectNotes, [projectNotes])

  useEffect(() => {
    if (id) {
      setLoading(true)
      const payload = {
        instance: api,
        id
      }
      try {
        dispatch(getProjectDetailsRequest(payload, (res) => {
          if (res) {
            setProjectDetail(res)
            setLoading(false)
          }
        }))
      } catch (error) {
        setLoading(false)
      }
    }
  }, [id])

  const handleFetchProjectNotesList = useCallback(({
    page,
    size
  }) => {
    try {
      setNotesLoading(true)
      const payload = {
        projectId: id,
        page: page || pageNumber,
        limit: size || pageSize,
        instance: api
      }
      dispatch(getProjectNotesRequest(payload, (response) => {
        if (response) {
          const data = {
            items: response.data,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            hasNextPage: response.hasNextPage,
            hasPreviousPage: response.hasPreviousPage,
            pageNumber: response.pageNumber,
            pageSize: response.pageSize
          }
          setProjectNotes(data)
        }
        setNotesLoading(false)
      }))
    } catch (error) {
      setNotesLoading(false)
    }
  }, [api, pageNumber, pageSize, id])

  useEffect(() => {
    handleFetchProjectNotesList({ page: 1 })
  }, [])

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [])

  const handleRemoveNote = useCallback((id) => {
    if (id) {
      try {
        const payload = {
          instance: api,
          id
        }
        dispatch(deleteProjectNoteRequest(payload, () => {
          handleFetchProjectNotesList({ page: 1 })
        }))
      } catch (error) {
        console.log(error)
      }
    }
  }, [api, handleFetchProjectNotesList])

  const handlePagination = useCallback((type) => {
    if (type === 'prev' && hasPreviousPage) {
        handleFetchProjectNotesList({ page: pageNumber - 1 })
    } else if (type === 'next' && hasNextPage) {
      handleFetchProjectNotesList({ page: pageNumber + 1 })
    }
  }, [hasNextPage, hasPreviousPage, pageNumber, handleFetchProjectNotesList])

  const handleRedirectToKanban = useCallback(() => {
    navigate('/kanban/board', {
      state: {
        project: {
          _id: projectDetail._id,
          title: projectDetail.title
        },
        isDisableSelect: true
      }
    })
  }, [projectDetail])

  return (
    <DashboardWrapper>
        <div className='mb-2'>
            <Button type='button' onClick={handleGoBack}>BACK</Button>
        </div>
        <Row>
            <Col md={7}>
                <ProjectCard 
                  data={projectDetail}
                  isDetailView
                  isLoading={loading}
                />
            </Col>
            <Col md={5}>
                {
                  !!user?.role && user.role === ROLE_LIST.ADMIN && <ProjectNoteCreateForm 
                  projectId={id}
                  options={projectDetail.assignee}
                  onFetchNotes={handleFetchProjectNotesList}
                />
                }
              <div className='table__add__data mt-2'>
                <div className='add__link__fields row'>
                    <Col>
                      <Button onClick={handleRedirectToKanban} color='primary'>Kanban Board</Button>
                    </Col>
                </div>
              </div>
            </Col>
        </Row>
        <div className={styles.note_wrapper}>
          <Row>
          <Col md={7} className={styles.note_cards}>
            {
              notesLoading && 
              <Skeleton height={100} />
            }
            {
              items.map((note) => (
                <NoteItem 
                  key={note._id}
                  content={note.note}
                  noteId={note._id}
                  isFooterRequired
                  footerText={note.mentions}
                  onDeleteNote={handleRemoveNote}
                />
              ))
            }
            {
              !!projectNotes.items.length && (hasNextPage || hasPreviousPage) && <div className={styles.paginated_wrapper}>
              <GrFormPreviousLink color='#ccc' onClick={() => handlePagination('prev')} size={30} className={!hasPreviousPage ? 'disable_icon' : ''} />
              <GrFormNextLink onClick={() => handlePagination('next')} size={30} className={!hasNextPage ? 'disable_icon' : ''} />
          </div>
            }
          </Col>
          <Col md={5}>
          </Col>
          </Row>
        </div>
    </DashboardWrapper>
  )
}

export default ProjectDetails