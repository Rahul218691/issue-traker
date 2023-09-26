import React from 'react'
import { useParams } from 'react-router-dom'

import BreadCrumbItem from '../../components/BreadCrumb'
import DashboardWrapper from '../../components/wrapper'

import { breadCrumConfig } from './config'

const CreateBoard = () => {

    const { projectId } = useParams()

  return (
    <DashboardWrapper>
        <BreadCrumbItem 
            breadCrumbConfig={breadCrumConfig}
        />
        <div className='table__add__data'>
            <div className='add__link__fields row'>

            </div>
        </div>
    </DashboardWrapper>
  )
}

export default CreateBoard