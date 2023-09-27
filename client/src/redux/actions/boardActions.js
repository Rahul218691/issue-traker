export const CREATE_BOARD_REQUEST = 'CREATE_BOARD_REQUEST'

export const createBoardRequest = (payload, callback = () => { }) => {
    return {
        type: CREATE_BOARD_REQUEST,
        payload,
        callback
    }
}