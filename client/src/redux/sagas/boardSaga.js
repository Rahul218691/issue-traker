import { call, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { CREATE_BOARD_REQUEST, GET_PROJECT_BOARD_REQUEST } from '../actions/boardActions'

import { createBoard, getBoard } from '../../services/boardService'

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

 function* getProjectBoardRequest (action) {
   try {
      const response = yield call(getBoard, action.payload)
      action.callback(response.data)
   } catch (error) {
      action.callback()
       toast.error(error?.response?.data?.msg)
   }
 }

function* boardSaga() {
    yield takeLatest(CREATE_BOARD_REQUEST, createNewBoardRequest)
    yield takeLatest(GET_PROJECT_BOARD_REQUEST, getProjectBoardRequest)
}

export default boardSaga