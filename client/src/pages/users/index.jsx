import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

import useAxios from '../../hooks/useAxios'
import DashboardWrapper from '../../components/wrapper'
import ImportButton from '../../components/ImportButton'
import TableView from '../../components/tableView'
import { getColumnConfig } from './TableConfig'
import { PAGE_SIZE_LIMIT, ROW_ACTION_TYPES } from '../../helpers/Constants'

import CreateUserForm from './CreateUserForm'
import { deleteUser, getUsersList } from '../../services/userServices'

import { debounceFunction } from '../../utils/index'
import { importUsersData } from '../../services/importService'

const INITIAL_USERS_LIST = {
  items: [],
  totalPages: 0,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  pageNumber: 1,
  pageSize: PAGE_SIZE_LIMIT
}

const ManageUsers = () => {

  const api = useAxios()

  const [isShowAddScreen, setIsShowAddScreen] = useState(false)
  const [users, setUsers] = useState(Object.assign({}, INITIAL_USERS_LIST))
  const [loading ,setLoading] = useState(false)

  const { items, pageSize, pageNumber, totalCount } = useMemo(() => users, [users])

  const handleToggleAddScreen = useCallback(() => {
    setIsShowAddScreen(prevState => !prevState)
  }, [])

  const handleFetchUsersList = useCallback(async({
    page,
    size,
    search = ''
  }) => {
    try {
      setLoading(true)

      const searchVal = search ? search.trim() : ''

      const payload = {
        page: page || pageNumber,
        limit: size || pageSize,
        genericSearch: searchVal
      }

      const response = await getUsersList(api, payload)

      const data = {
        items: response.data,
        totalPages: response.totalPages,
        totalCount: response.totalCount,
        hasNextPage: response.hasNextPage,
        hasPreviousPage: response.hasPreviousPage,
        pageNumber: response.pageNumber,
        pageSize: response.pageSize
      }

      setUsers(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.msg)
    }
  }, [pageNumber, pageSize, api])

  useEffect(() => {
    handleFetchUsersList({ page: 1 })
  }, [])

  const handleChangeGenericSearch = useCallback((e) => {
    const { value } = e.target
    handleFetchUsersList({ page: 1, search: value })
  }, [])

  const handleDebounceSearch = useCallback(debounceFunction(handleChangeGenericSearch), [])

  const handleSelectMenuAction = useCallback(async(id, data) => {
    if (id === ROW_ACTION_TYPES.DELETE) {
      try {
        const response = await deleteUser(api, data._id)
        toast.success(response.msg)
        handleFetchUsersList({ page: 1 })
      } catch (error) {
        toast.error(error?.response?.data?.msg)
      }
    }
  }, [api, handleFetchUsersList])

  const handleImportFile = useCallback(async(file) => {
    try {
      let formdata = new FormData()
      formdata.append('type', 'users')
      formdata.append('file', file)
      const response = await importUsersData('/api/data/import', api, formdata)
      toast.success(response.msg)
      handleFetchUsersList({ page: 1 })
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }, [api, handleFetchUsersList])

  const handlePagination = useCallback((page) => {
    const pageNum = Number(page)
    handleFetchUsersList({ page: pageNum })
  }, [handleFetchUsersList])

  const columns = useMemo(() => {
    return getColumnConfig({
      onRowActionSelect: handleSelectMenuAction
    })
  }, [handleSelectMenuAction])

  return (
    <DashboardWrapper>
        <ImportButton 
          text='Import Users'
          icon='bx-user-plus'
          onSelectImport={handleImportFile}
        />
        {
          isShowAddScreen && <CreateUserForm 
            onCloseAddScreen={handleToggleAddScreen} 
            onFetchUsers={handleFetchUsersList}
          />
        }
        <TableView 
          title="Manage Users"
          columns={columns}
          data={items}
          isGenericSearchRequired
          isPaginationRequired
          isServerSideGenericSearch
          isShowAddForm
          currentPage={pageNumber}
          totalCount={totalCount}
          pageSize={pageSize}
          onChangeGenericSearch={handleDebounceSearch}
          onToggleAddScreen={handleToggleAddScreen}
          onPageChange={handlePagination}
        />
    </DashboardWrapper>
  )
}

export default ManageUsers