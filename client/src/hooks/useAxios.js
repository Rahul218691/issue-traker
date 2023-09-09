import { useContext, useMemo } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import dayjs from 'dayjs'

import { APP_CONFIGS } from '../config';
import { AuthContext } from '../context/AuthContextProvider';
import { decryptData } from '../utils/index';

export const BASE_URL = APP_CONFIGS.API_BASE_URL

const useAxios = () => {

    const { dispatch } = useContext(AuthContext)

    const token = useMemo(() => {
        if (window.localStorage.getItem('isAuthorized') && window.localStorage.getItem('user')) {
            const userData = decryptData('user')
            return userData.access_token
        }
        return null
    }, [])

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers:{Authorization: `Bearer ${token}`}
    });

    axiosInstance.interceptors.request.use(async(req) => {
        const userData = decryptData('user')
        const user = jwt_decode(userData?.access_token)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return req
        const payload = {
            userId: userData.user.userSlug
        }
        const { data } = await axios.post(`${BASE_URL}/api/refresh_token`, payload);
        dispatch({
            type: 'LOG_IN_USER',
            payload: data
        })
        req.headers.Authorization = `Bearer ${data.access_token}`
        return req
    })

    const responseHandler = response => {
        if (response.status === 401) {
            window.location = '/';
        }
    
        return response;
    }
    
    const errorHandler = error => {
        return Promise.reject(error);
    }

    axiosInstance.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
    );
    
  return axiosInstance
}

export default useAxios