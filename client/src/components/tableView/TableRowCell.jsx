import React from 'react'
import get from 'lodash.get'

const TableRowCell = ({
    item,
    column
}) => {

    const value = get(item, column.key)

  return (
    <td>
        {column.render ? column.render(column, item) : column.cell ? column.cell(column, item) : value}
    </td>
  )
}

export default TableRowCell