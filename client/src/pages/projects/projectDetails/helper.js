export const validateNoteInfo = ({
    note
}) => {
    const errors = {}

    if (!note) {
        errors['note'] = 'Please provide the note content'
    }

    return errors
}