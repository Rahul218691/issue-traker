import React, { useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { importFileValidations } from '../utils/index'

const ImportButton = ({
    text = '',
    icon,
    onSelectImport = () => { }
}) => {

    const InputRef = useRef()

    const handleChooseFile = useCallback(() => {
        if (InputRef) {
            InputRef.current.click()
        }
    }, [InputRef])

    const handleChangeInput = useCallback((e) => {
        e.preventDefault()
        let file = e.target.files[0]
        const validate = importFileValidations(file)
        if (!validate) return toast.error('Please Choose CSV file to upload')
        onSelectImport(file)
    }, [onSelectImport])

    return (
        <div className='head-title'>
            <button className='btn-download' onClick={handleChooseFile}>
                <i className={`bx ${icon}`}></i>
                <span className='text'>{text}</span>
            </button>
            <input 
                type='file'
                className='hiiden_file_input'
                ref={InputRef}
                onChange={handleChangeInput}
            />
        </div>
    )
}

export default ImportButton