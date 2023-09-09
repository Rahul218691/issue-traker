export const FETCH_PROJECT_LIST_REQUEST = 'FETCH_PROJECT_LIST_REQUEST'
export const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT'
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST'

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

export const deleteProjectRequest = (payload) => {
    return {
        type: DELETE_PROJECT_REQUEST,
        payload
    }
}