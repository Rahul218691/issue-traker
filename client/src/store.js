import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import projectReducer from './redux/reducers/projectSlice'
import rootSaga from './redux/sagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
    reducer: {
        projects: projectReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)