import { call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { FETCH_PROJECT_LIST_REQUEST, CREATE_NEW_PROJECT, DELETE_PROJECT_REQUEST } from '../actions/projectActions'

import { fetchProjects, createProject, deleteProject } from '../../services/projectService'
import { setProjects, addNewProject } from '../reducers/projectSlice'

function* fetchProjectsListRequest(action) {
     try {
        const response = yield call(fetchProjects, action.payload)
        yield put(setProjects(response))
     } catch (error) {
        toast.error(error?.response?.data?.msg)
     }
}

function* createNewProjectRequest (action) {
   try {
      const response = yield call(createProject, action.payload)
      toast.success(response.msg)
      yield put(addNewProject(response.project))
      action.callback(true)
   } catch (error) {
      action.callback()
      toast.error(error?.response?.data?.msg)
   }
}

function* deleteProjectRequest (action) {
   try {
      const response = yield call(deleteProject, action.payload)
      toast.success(response.msg)
   } catch (error) {
      toast.error(error?.response?.data?.msg)
   }
}

function* projectSaga() {
    yield takeLatest(FETCH_PROJECT_LIST_REQUEST, fetchProjectsListRequest)
    yield takeLatest(CREATE_NEW_PROJECT, createNewProjectRequest)
    yield takeLatest(DELETE_PROJECT_REQUEST, deleteProjectRequest)
}

export default projectSaga