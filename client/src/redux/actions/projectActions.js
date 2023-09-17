export const FETCH_PROJECT_LIST_REQUEST = 'FETCH_PROJECT_LIST_REQUEST'
export const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT'
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST'
export const GET_PROJECT_DETAIL_REQUEST = 'GET_PROJECT_DETAIL_REQUEST'
export const CREATE_NEW_PROJECT_NOTE_REQUEST = 'CREATE_NEW_PROJECT_NOTE_REQUEST'
export const GET_PROJECT_NOTE_REQUEST = 'GET_PROJECT_NOTE_REQUEST'
export const DELETE_PROJECT_NOTE_REQUEST = 'DELETE_PROJECT_NOTE_REQUEST'

export const fetchProjectListRequest = (payload, callback = () => { }) => {
    return {
        type: FETCH_PROJECT_LIST_REQUEST,
        payload,
        callback
    }
}

export const createNewProjectRequest = (payload, callback = () => { }) => {
    return {
        type: CREATE_NEW_PROJECT,
        payload,
        callback
    }
}

export const deleteProjectRequest = (payload, callback = () => { }) => {
    return {
        type: DELETE_PROJECT_REQUEST,
        payload,
        callback
    }
}

export const getProjectDetailsRequest = (payload, callback = () => { }) => {
    return {
        type: GET_PROJECT_DETAIL_REQUEST,
        payload,
        callback
    }
}

export const createNewProjectNoteRequest = (payload, callback = () => { }) => {
    return {
        type: CREATE_NEW_PROJECT_NOTE_REQUEST,
        payload,
        callback
    }
}

export const getProjectNotesRequest = (payload, callback = () => { }) => {
    return {
        type: GET_PROJECT_NOTE_REQUEST,
        payload,
        callback
    }
}

export const deleteProjectNoteRequest = (payload, callback = () => { }) => {
    return {
        type: DELETE_PROJECT_NOTE_REQUEST,
        payload,
        callback
    }
}