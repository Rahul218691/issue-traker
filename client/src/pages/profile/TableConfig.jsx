export const getColumnConfig = () => [
    {
        key: 'projectName',
        title: 'Project'
    },
    {
        key: "startedDate",
        title: "Start Date"
    },
    {
        key: "status",
        title: "Project Status",
        render: (_, { status }) => (
            <span className="status process">{status}</span>
        )
    }
]