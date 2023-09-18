import { randomNumber } from './index'

const COMMON_MENU = [
    {
        id: randomNumber(),
        title: 'Dashboard',
        icon: 'bxs-dashboard',
        path: '/home'
    },
    {
        id: randomNumber(),
        title: 'Projects',
        icon: 'bx-list-ul',
        path: '/projects'
    },
    {
        id: randomNumber(),
        title: 'Kanban Board',
        icon: 'bx-task',
        path: '/kanban/board'
    }
]

const getSettingsMenu = (id) => {
    return [
        {
            id: randomNumber(),
            title: 'Profile',
            icon: 'bxs-user-detail',
            path: `/user/profile/${id}`,
        },
        {
            id: randomNumber(),
            title: 'Logout',
            icon: 'bx-log-out',
            path: '',
            isLogoutRoute: true
        }
    ]
}

const ADMIN_MENU_LINKS = [
    ...COMMON_MENU,
    {
        id: randomNumber(),
        title: 'Users',
        icon: 'bxs-user-plus',
        path: '/users'
    }
]

const DEVELOPER_MENU_LINKS = [
    ...COMMON_MENU
]

export const getMenu = (user) => {
    if (user.role === 'admin') {
        return [
            ...ADMIN_MENU_LINKS,
            ...getSettingsMenu(user._id)
        ]
    } else if (user.role === 'developer') {
        return [
            ...DEVELOPER_MENU_LINKS,
            ...getSettingsMenu(user._id)
        ]
    }
}