import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { FETCH_PROJECT_LIST_REQUEST, CREATE_NEW_PROJECT, DELETE_PROJECT_REQUEST, GET_PROJECT_DETAIL_REQUEST, CREATE_NEW_PROJECT_NOTE_REQUEST,
   GET_PROJECT_NOTE_REQUEST,
   DELETE_PROJECT_NOTE_REQUEST
 } from '../actions/projectActions'

import { fetchProjects, createProject, deleteProject, getProjectById, createProjectNote, getProjectNotes, deleteProjectNote } from '../../services/projectService'
import { setProjects, addNewProject, removeProject } from '../reducers/projectSlice'

function* fetchProjectsListRequest(action) {
     try {
        const response = yield call(fetchProjects, action.payload)
        if (action.payload?.isDDL) {
         action.callback(response)
        } else {
         yield put(setProjects(response))
         action.callback(true)
        }
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
      action.callback()
   } catch (error) {
      action.callback()
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

function* createNewProjectNoteRequest (action) {
   try {
      const response = yield call(createProjectNote, action.payload)
      toast.success(response.msg)
      action.callback(response)
   } catch (error) {
      action.callback()
      toast.error(error?.response?.data?.msg)
   }
}

function* getProjectNoteListRequest (action) {
   try {
      const response = yield call(getProjectNotes, action.payload)
      toast.success(response.msg)
      action.callback(response)
   } catch (error) {
      action.callback()
      toast.error(error?.response?.data?.msg)
   }
}

function* deleteProjectNoteRequest (action) {
   try {
      const response = yield call(deleteProjectNote, action.payload)
      toast.success(response.msg)
      action.callback()
   } catch (error) {
      action.callback()
      toast.error(error?.response?.data?.msg)
   }
}

function* projectSaga() {
    yield takeLatest(FETCH_PROJECT_LIST_REQUEST, fetchProjectsListRequest)
    yield takeLatest(CREATE_NEW_PROJECT, createNewProjectRequest)
    yield takeLatest(DELETE_PROJECT_REQUEST, deleteProjectRequest)
    yield takeEvery(GET_PROJECT_DETAIL_REQUEST, getProjectDetailsRequest)
    yield takeLatest(CREATE_NEW_PROJECT_NOTE_REQUEST, createNewProjectNoteRequest)
    yield takeEvery(GET_PROJECT_NOTE_REQUEST, getProjectNoteListRequest)
    yield takeLatest(DELETE_PROJECT_NOTE_REQUEST, deleteProjectNoteRequest)
}

export default projectSaga