import { call, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { CREATE_BOARD_REQUEST } from '../actions/boardActions'

import { createBoard } from '../../services/boardService'

function* createNewBoardRequest (action) {
    try {
       const response = yield call(createBoard, action.payload)
       toast.success(response.msg)
       action.callback(true)
    } catch (error) {
       action.callback()
       toast.error(error?.response?.data?.msg)
    }
 }

function* boardSaga() {
    yield takeLatest(CREATE_BOARD_REQUEST, createNewBoardRequest)
}

export default boardSaga