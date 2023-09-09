import React from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'

const ReactSelect = ({
    defaultOptions = [],
    options = [],
    isMulti = false,
    isDisabled = false,
    isLoading = false,
    isClearable = false,
    isLabelRequired = false,
    isRequired = false,
    labelText = '',
    id = '',
    name = '',
    value,
    errors = {},
    placeholder,
    onSelect = () => { },
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
        <Select 
        className='mb-4'
        isLoading={isLoading}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        defaultOptions={defaultOptions}
        options={options}
        id={id}
        menuPlacement='auto'
        menuPortalTarget={document.body} 
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(selected) => onSelect(null, id, selected)}
        {...props}
    />
        {
            errors && <span className='error__message'>{errors[id]}</span>
        }
    </>
  )
}

export default ReactSelect