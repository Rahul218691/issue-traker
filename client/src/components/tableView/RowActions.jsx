import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { FaEllipsisH, FaEllipsisV } from 'react-icons/fa'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

const RowActions = ({
    data,
    actionsConfig,
    isGridViewAction = true,
    onSelect = () => { }
}) => {

    const handleSelect = useCallback((event) => {
        const { id } = event.target
        onSelect(id, data)
    }, [onSelect, data])

    return (
        <UncontrolledDropdown
            direction='start'
        >
            <DropdownToggle tag="span">
                {
                    isGridViewAction ? <FaEllipsisH className='font_icons' /> : <FaEllipsisV className='font_icons' />
                }
            </DropdownToggle>
            <DropdownMenu>
                {
                    actionsConfig.map((config, configIndex) => (
                        <DropdownItem key={`action-item-${configIndex}`} id={config} onClick={handleSelect}>
                            {config}
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

RowActions.propTypes = {
    data: PropTypes.object,
    actionsConfig: PropTypes.array,
    onSelect: PropTypes.func
}

export default RowActions