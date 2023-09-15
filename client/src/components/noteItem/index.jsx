import React from 'react'
import styles from './noteItem.module.css'

const NoteItem = ({
    content = '',
    isFooterRequired = false,
    footerText = ''
}) => {
    return (
        <blockquote className={styles.blockquote}>
            {content}
            {
                isFooterRequired && <span className={styles.footer_span}>{footerText}</span>
            }
        </blockquote>
    )
}

export default NoteItem