import React, { useCallback, useContext, useMemo } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { AuthContext } from '../../context/AuthContextProvider'
import { ROLE_LIST } from '../../helpers/Constants'
import styles from './noteItem.module.css'

const NoteItem = ({
    content = '',
    noteId,
    isFooterRequired = false,
    footerText,
    onDeleteNote = () => { }
}) => {

    const { state } = useContext(AuthContext)

    const noteMentions = useMemo(() => {
        if (isFooterRequired && footerText) {
            if (Array.isArray(footerText)) {
                const mentionTexts = footerText.map((text) => {
                    return text.username
                })
                return String(mentionTexts)
            } else {
                return footerText
            }
        }
    }, [footerText, isFooterRequired])

    const handleDeleteNote = useCallback(() => {
        if (noteId) {
            onDeleteNote(noteId)
        }
    }, [noteId, onDeleteNote])

    return (
        <blockquote className={styles.blockquote}>
            {content}
            { state && state.user && state.user.role === ROLE_LIST.ADMIN && <FaTrash onClick={handleDeleteNote} /> }
            {
                isFooterRequired && <span className={styles.footer_span}>{noteMentions}</span>
            }
        </blockquote>
    )
}

export default NoteItem