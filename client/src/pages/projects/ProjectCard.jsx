import moment from 'moment'
import React, { useCallback, useContext } from 'react'
import { Badge, Card, CardBody, CardSubtitle, CardText } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useAxios from '../../hooks/useAxios'
import { AuthContext } from '../../context/AuthContextProvider'
import AvatarGroups from '../../components/avatarGroups'
import DataLoading from '../../components/DataLoading'
import RowActions from '../../components/tableView/RowActions'
import { ROLE_LIST, ROW_ACTION_TYPES, STATUS_COLOR_CODES } from '../../helpers/Constants'

import { deleteProjectRequest } from '../../redux/actions/projectActions'

import styles from './project.module.css'

const ProjectCard = ({
    data,
    isDetailView = false,
    isLoading = false
}) => {
    const dispatch = useDispatch()
    const api = useAxios()
    const navigate = useNavigate()

    const {state} = useContext(AuthContext)

    const handleSelectAction = useCallback((id, data) => {
        if (id === ROW_ACTION_TYPES.DELETE) {
          const payload = {
            instance: api,
            id: data._id
          }
          dispatch(deleteProjectRequest(payload, () => {
            if (isDetailView) {
                navigate('/projects')
              }
          }))
        }
      }, [api, isDetailView])

    return (
        <Card className={isDetailView ? styles.project_detailcard : styles.project_card}>
            <CardBody>
                {
                    isLoading ? <DataLoading /> : (
                        <>
                            <div className={styles.project_card_header}>
                                <CardText>{!isDetailView ? <Link to={`/project/${data._id}`}>{data.title}</Link> : <span className={styles.project_title}>{data.title}</span>}</CardText>
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
                            {
                                isDetailView && (
                                    <>
                                        <CardSubtitle tag={'p'} className={styles.project_description}>
                                            {data?.description}
                                        </CardSubtitle>
                                        <h6 className='mt-2'>
                                            Project Lead: <b>{data?.projectLead?.username}</b>
                                        </h6>
                                        <div className={styles.project_info}>
                                            <CardText>
                                                Team Members ({data?.assignee?.length})
                                            </CardText>
                                            <Badge 
                                                className={styles.project_badge}
                                                color={STATUS_COLOR_CODES[data.projectStatus]}
                                            >{data?.projectStatus}</Badge>
                                        </div>
                                        <div className='mt-2'>
                                            {
                                                data?.category?.map((cat) => (
                                                    <Badge className={styles.categoryBadge} key={cat.label} color='primary'>{cat.label}</Badge>
                                                ))
                                            }
                                        </div>
                                    </>
                                )
                            }
                            <div className={styles.avatarList}>
                                <AvatarGroups data={data.assignee} totalAssignee={data.totalAssignee} />
                            </div>
                        </>
                    )
                }
            </CardBody>
        </Card>
    )
}

export default ProjectCard