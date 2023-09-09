import React, { useContext, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

import { AuthContext } from '../../context/AuthContextProvider'
import { getMenu } from '../../utils/menuList'
import { decryptData } from '../../utils'
import { APP_CONFIGS } from '../../config'

const DashboardSideMenu = ({
    open
}) => {
    
    const location = useLocation()
    const { state } = useContext(AuthContext)

    const handleMenuAction = useCallback(async(menu) => {
        if (menu.isLogoutRoute) {
            const data = decryptData('user')
            await axios.post(`${APP_CONFIGS.API_BASE_URL}/api/logout`, {
                userId: data.user.userSlug
            })
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('isAuthorized')
            window.location.reload()
        }
    }, [])

    return (
        <section id="sidebar" className={`${!open ? 'hide' : ''}`}>
            <Link to="/home" className="brand">
                <i className='bx bxs-bug'></i>
                <span className="text">Bugzilla</span>
            </Link>
            <ul className="side-menu top">
            {
               state && state.user && getMenu(state.user).map((menu) => (
                    <li className={`${location.pathname === menu.path ? 'active' : ''}`} key={menu.id}
                        onClick={() => handleMenuAction(menu)}
                    >
                        <Link to={`${menu.path}`}>
                            <i className={`bx ${menu.icon}`}></i>
                            <span className="text">{menu.title}</span>
                        </Link>
                    </li>
                ))
            }
            </ul>
        </section>
    )
}

export default DashboardSideMenu