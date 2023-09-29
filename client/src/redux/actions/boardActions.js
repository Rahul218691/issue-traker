export const CREATE_BOARD_REQUEST = 'CREATE_BOARD_REQUEST'
export const GET_PROJECT_BOARD_REQUEST = 'GET_PROJECT_BOARD_REQUEST'

export const createBoardRequest = (payload, callback = () => { }) => {
    return {
        type: CREATE_BOARD_REQUEST,
        payload,
        callback
    }
}

export const getProjectBoardRequest = (payload, callback = () => { }) => {
    return {
        type: GET_PROJECT_BOARD_REQUEST,
        payload,
        callback
    }
}