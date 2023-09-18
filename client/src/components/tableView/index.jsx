import React, { useCallback, useMemo, memo } from 'react'

import Pagination from './Pagination'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const TableView = ({
    columns,
    data,
    title,
    customStyle,
    isGenericSearchRequired = false,
    genericSearch,
    currentPage,
    totalCount,
    pageSize,
    disableRowClick = true,
    isShowAddForm = false,
    isPaginationRequired = false,
    isServerSideGenericSearch = false,
    onChangeGenericSearch = () => { },
    onToggleAddScreen = () => { },
    onPageChange = () => { },
    onRowClick = () => { }
}) => {

    const handleGenericSearch = useCallback((event) => {
        onChangeGenericSearch(event)
    }, [onChangeGenericSearch])

    const filteredRows = useMemo(() => {
        if (!genericSearch || isServerSideGenericSearch) return data
        const gridFirstItem = Object.values(columns[0])
        return data.filter(row => row[gridFirstItem[0]].toString().toLowerCase().indexOf(genericSearch.toLowerCase()) > -1)
    }, [genericSearch, data, columns, isServerSideGenericSearch])

  return (
    <div className='table-data' style={customStyle}>
        <div className='order'>
            <div className='head'>
                <h3>{title}</h3>
                {
                    isGenericSearchRequired && (
                        <>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-input">
                                <input type="search" placeholder="Search..." value={genericSearch} onChange={handleGenericSearch}/>
                            </div>
                        </form>
                        {isShowAddForm && (
                            <i className='bx bx-plus-medical' title='Add New' onClick={onToggleAddScreen}></i>
                        )}
                        </>
                    )
                }
            </div>
            <table>
                <thead>
                    <TableHeader columns={columns} />
                </thead>
                <tbody>
                    <TableRow 
                    data={filteredRows}
                    columns={columns} 
                    disableRowClick={disableRowClick}
                    onRowClick={onRowClick}
                    />
                </tbody>
            </table>
            {
                isPaginationRequired && 
                <Pagination 
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            }
        </div>
    </div>
  )
}

export default memo(TableView)