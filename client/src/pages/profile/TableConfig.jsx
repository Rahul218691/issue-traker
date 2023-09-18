import moment from 'moment'
import { STATUS_COLOR_CODES } from './config'

export const getColumnConfig = () => [
    {
        key: 'title',
        title: 'Project'
    },
    {
        key: "startDate",
        title: "Start Date",
        render: (_, { startDate }) => (
            <span>{moment(startDate).format('LL')}</span>
        )
    },
    {
        key: "projectStatus",
        title: "Project Status",
        render: (_, { projectStatus }) => (
            <span className={`status ${STATUS_COLOR_CODES[projectStatus]}`}>{projectStatus}</span>
        )
    }
]