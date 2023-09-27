import { all, call } from 'redux-saga/effects'
import projectSaga from './projectSaga'
import boardSaga from './boardSaga'

export default function* rootSaga() {
    yield all([
        call(projectSaga),
        call(boardSaga)
    ])
}