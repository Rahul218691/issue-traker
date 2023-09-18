import React, { useCallback } from 'react'

import TableRowCell from './TableRowCell'

const TableRow = ({
    data,
    columns,
    disableRowClick,
    onRowClick = () => { }
}) => {

    const handleRowClick = useCallback((data) => {
        onRowClick(data)
    }, [onRowClick])

  return (
    <>
        {
            data.map((item, itemIndex) => (
                <tr className={`${!disableRowClick ? 'row_clickable' : ''}`} key={`table-body-${itemIndex}`}
                    onClick={() => handleRowClick(item)}
                >
                    {
                        columns.map((column, columnIndex) => (
                            <TableRowCell 
                                key={`table-row-cell-${columnIndex}`}
                                item={item}
                                column={column}
                            />
                        ))
                    }
                </tr>
            ))
        }
    </>
  )
}

export default TableRow