import React from 'react'

const TableHeader = ({
    columns
}) => {
  return (
    <tr>
        {
            columns.map((column, columnIndex) => (
                <th key={`table-header-cell-${columnIndex}`}
                    style={{width: column.width}}
                >
                    {column.title}
                </th>
            ))
        }
    </tr>
  )
}

export default TableHeader