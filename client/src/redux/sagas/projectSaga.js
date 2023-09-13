import { call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { FETCH_PROJECT_LIST_REQUEST, CREATE_NEW_PROJECT, DELETE_PROJECT_REQUEST, GET_PROJECT_DETAIL_REQUEST } from '../actions/projectActions'

import { fetchProjects, createProject, deleteProject, getProjectById } from '../../services/projectService'
import { setProjects, addNewProject, removeProject } from '../reducers/projectSlice'

function* fetchProjectsListRequest(action) {
     try {
        const response = yield call(fetchProjects, action.payload)
        yield put(setProjects(response))
        action.callback(true)
     } catch (error) {
         action.callback()
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
      yield put(removeProject(action.payload.id))
      toast.success(response.msg)
   } catch (error) {
      toast.error(error?.response?.data?.msg)
   }
}

function* getProjectDetailsRequest (action) {
   try {
      const response = yield call(getProjectById, action.payload)
      action.callback(response)
   } catch (error) {
      action.callback()
      toast.error(error?.response?.data?.msg)
   }
}

function* projectSaga() {
    yield takeLatest(FETCH_PROJECT_LIST_REQUEST, fetchProjectsListRequest)
    yield takeLatest(CREATE_NEW_PROJECT, createNewProjectRequest)
    yield takeLatest(DELETE_PROJECT_REQUEST, deleteProjectRequest)
    yield takeLatest(GET_PROJECT_DETAIL_REQUEST, getProjectDetailsRequest)
}

export default projectSaga