import { all, call } from 'redux-saga/effects'
import projectSaga from './projectSaga'


export default function* rootSaga() {
    yield all([
        call(projectSaga)
    ])
}