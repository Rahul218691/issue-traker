import moment from 'moment'
import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, CardBody, CardSubtitle, CardText } from 'reactstrap'

import useAxios from '../../hooks/useAxios'
import { AuthContext } from '../../context/AuthContextProvider'
import { fetchProjectListRequest } from '../../redux/actions/projectActions'

import DashboardWrapper from '../../components/wrapper'
import AvatarGroups from '../../components/avatarGroups'
import { ROLE_LIST, ROW_ACTION_TYPES } from '../../helpers/Constants'

import styles from './project.module.css'
import RowActions from '../../components/tableView/RowActions'

import { deleteProjectRequest } from '../../redux/actions/projectActions'

const Projects = () => {

  const dispatch = useDispatch()
  const api = useAxios()
  const { items,
      pageNumber,
      pageSize } = useSelector(state => state.projects)
  const navigate = useNavigate()

  const {state} = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const handleRedirectToProjectSetup = useCallback(() => {
    navigate('/project/create')
  }, [navigate])

  const handleFetchProjects = useCallback(({
    page,
    size,
    search = ''
  }) => {
     setLoading(true)
     const searchVal = search ? search.trim() : ''
     const payload = {
        page: page || pageNumber,
        limit: size || pageSize,
        genericSearch: searchVal,
        instance: api
     }
     dispatch(fetchProjectListRequest(payload))
     setLoading(false)
  }, [pageNumber, pageSize, api])

  const handleSelectAction = useCallback((id, data) => {
    if (id === ROW_ACTION_TYPES.DELETE) {
      const payload = {
        instance: api,
        id: data._id
      }
      dispatch(deleteProjectRequest(payload))
    }
  }, [api])

  useEffect(() => {
    if (!items.length) {
      handleFetchProjects({ page: 1 })
    }
  }, [items])

  return (
    <DashboardWrapper>
      <div className={styles.project_header}>
        <h2 className='page_header'>Projects</h2>
        <Button color='primary' disabled={loading} onClick={handleRedirectToProjectSetup}>Create Project</Button>
      </div>
      {
        loading ? <></> : (
          <div className={styles.project_wrapper}>
              {
                items.map((data) => (
                  <Card className={styles.project_card} key={data._id}>
                    <CardBody>
                      <div className={styles.project_card_header}>
                        <CardText>{data.title}</CardText>
                        {
                          state.user.role === ROLE_LIST.ADMIN && (
                            <div>
                              <RowActions 
                                isGridViewAction={false}
                                actionsConfig={[ROW_ACTION_TYPES.EDIT, ROW_ACTION_TYPES.DELETE]}
                                onSelect={(id) => handleSelectAction(id, data)}
                              />
                            </div>
                          )
                        }
                      </div>
                      <CardSubtitle>{moment(data.startDate).format('LL')}</CardSubtitle>
                      <div className={styles.avatarList}>
                        <AvatarGroups data={data.assignee} totalAssignee={data.totalAssignee} />
                      </div>
                    </CardBody>
                  </Card>
                ))
              }
          </div>
        )
      }
    </DashboardWrapper>
  )
}

export default Projects