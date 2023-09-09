import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Label } from 'reactstrap'

const ReactDatePicker = ({
    id = '',
    name = '',
    selected,
    isLabelRequired = false,
    isRequired = false,
    labelText = '',
    isClearable = false,
    errors = {},
    placeholderText = '',
    onDateChange = () => { }
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
            <br  />
            <DatePicker
                id={id}
                name={name}
                selected={selected}
                dateFormat="yyyy/MM/dd"
                isClearable={isClearable}
                placeholderText={placeholderText}
                onChange={(date) => onDateChange(null, id, date)}
            />
            <br />
            {
                errors && <span className='error__message'>{errors[id]}</span>
            }
        </>
    )
}

export default ReactDatePicker