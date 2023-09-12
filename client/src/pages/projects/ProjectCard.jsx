import moment from 'moment'
import React, { useCallback, useContext } from 'react'
import { Card, CardBody, CardSubtitle, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useAxios from '../../hooks/useAxios'
import { AuthContext } from '../../context/AuthContextProvider'
import AvatarGroups from '../../components/avatarGroups'
import RowActions from '../../components/tableView/RowActions'
import { ROLE_LIST, ROW_ACTION_TYPES } from '../../helpers/Constants'

import { deleteProjectRequest } from '../../redux/actions/projectActions'

import styles from './project.module.css'

const ProjectCard = ({
    data,
    isDetailView = false
}) => {

    const dispatch = useDispatch()
    const api = useAxios()

    const {state} = useContext(AuthContext)

    const handleSelectAction = useCallback((id, data) => {
        if (id === ROW_ACTION_TYPES.DELETE) {
          const payload = {
            instance: api,
            id: data._id
          }
          dispatch(deleteProjectRequest(payload))
        }
      }, [api])

    return (
        <Card className={isDetailView ? styles.project_detailcard : styles.project_card}>
            <CardBody>
                <div className={styles.project_card_header}>
                    <CardText><Link to={`/project/${data._id}`}>{data.title}</Link></CardText>
                    {
                        state?.user?.role === ROLE_LIST.ADMIN && (
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
    )
}

export default ProjectCard