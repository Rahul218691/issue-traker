import React from 'react'

import TableRowCell from './TableRowCell'

const TableRow = ({
    data,
    columns
}) => {
  return (
    <>
        {
            data.map((item, itemIndex) => (
                <tr key={`table-body-${itemIndex}`}>
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