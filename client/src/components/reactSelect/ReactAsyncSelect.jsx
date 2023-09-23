import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'reactstrap'
import { AsyncPaginate } from 'react-select-async-paginate'

const ReactAsyncSelect = ({
    id,
    name,
    value,
    placeholder,
    isLabelRequired,
    labelText,
    isMulti = false,
    isRequired,
    errors = {},
    isSearchable = true,
    isDisabled = false,
    onSelect = () => { },
    onLoadOptions = () => { },
    ...props
}) => {
  return (
      <>
        {
            isLabelRequired && (
                <Label>{labelText} {
                    isRequired && <span className='required__asterisk'>*</span>
                }</Label> 
            )
        }
      <AsyncPaginate 
        additional={{
            page: 1,
        }}
        id={id}
        name={name}
        placeholder={placeholder}
        menuPlacement={'auto'}
        value={value}
        isMulti={isMulti}
        debounceTimeout={300}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        menuPortalTarget={document.body} 
        styles={{ menuPortal: base => ({ ...base, zIndex: 99999999 }) }}
        onChange={(selected) => onSelect(null, id, selected)}
        loadOptions={onLoadOptions}
        {...props}
      />
        {
            errors && <span className='error__message'>{errors[id]}</span>
        }
      </>
  )
}

ReactAsyncSelect.propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.array
    ]),
    onSelect: PropTypes.func,
    onLoadOptions: PropTypes.func,
    placeholder: PropTypes.string,
    isSearchable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string
}

export default ReactAsyncSelect