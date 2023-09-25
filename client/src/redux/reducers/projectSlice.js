import { createSlice } from '@reduxjs/toolkit'

import { PAGE_SIZE_LIMIT } from '../../helpers/Constants'

const initialState = {
    items: [],
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    pageNumber: 1,
    pageSize: PAGE_SIZE_LIMIT
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, { payload }) => {
            state.items = payload.isLoadMore ? [...state.items, ...payload.data] : payload.data,
            state.totalPages = payload.totalPages,
            state.totalCount = payload.totalCount,
            state.hasNextPage = payload.hasNextPage,
            state.hasPreviousPage = payload.hasPreviousPage,
            state.pageNumber = payload.pageNumber,
            state.pageSize = payload.pageSize
        },
        removeProject: (state, { payload }) => {
            state.items = state.items.filter(x => x._id !== payload)
        },
        resetProjectList: () => initialState
    }
})

const { reducer, actions } = projectSlice
export const { setProjects, removeProject, resetProjectList } = actions
export default reducer