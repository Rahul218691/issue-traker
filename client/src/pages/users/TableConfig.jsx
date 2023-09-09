import { dateFormat } from "../../utils"
import RowActions from '../../components/tableView/RowActions'
import { ROW_ACTION_TYPES } from '../../helpers/Constants'

const ROW_ACTIONS = [ROW_ACTION_TYPES.VIEW, ROW_ACTION_TYPES.DELETE]

export const getColumnConfig = ({
    onRowActionSelect = () => { }
}) => [
    {
        key: 'username',
        title: 'UserName'
    },
    {
        key: "role",
        title: "Role"
    },
    {
        key: "profile",
        title: "User Profile",
        render: (_, { profile }) => (
            <img src={profile} alt='' />
        )
    },
    {
        key: "createdAt",
        title: "Created On",
        render: (_, { createdAt }) => (
            <p className="m-0">{dateFormat(createdAt)}</p>
        )
    },
    {
        title: "Actions",
        cell: (_, data) => <RowActions data={data} 
            actionsConfig={ROW_ACTIONS}
            onSelect={onRowActionSelect}
        />
    }
]