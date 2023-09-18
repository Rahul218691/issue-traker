import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import LazyLoader from './components/LazyLoader'
import { AuthProvider } from './context/AuthContextProvider'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'

const App = lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<LazyLoader />}>
    <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AuthProvider>
    </BrowserRouter>
    </Suspense>
)
