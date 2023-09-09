import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

const BreadCrumb = ({
    breadCrumbConfig = []
}) => {

    const location = useLocation()

    return (
        <div className="head-title">
        <div className="left">
            <ul className="breadcrumb">
                <li>
                    <Link className='active' to="/home">Home</Link>
                </li>
                {
                    breadCrumbConfig.map((config) => (
                        <li key={config.id}>
                           <span><i className='bx bx-chevron-right'></i></span> <Link className={location.pathname !== config.path ? 'active' : ''} to={config.path}>{config.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
    )
}

export default BreadCrumb