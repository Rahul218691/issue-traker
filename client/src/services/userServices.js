export const getUsersList = (instance, payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { page, limit, genericSearch, isDDL } = payload

            let url = `/api/getUsers?page=${page}&limit=${limit}`

            if (genericSearch) {
                url = `${url}&genericSearch=${genericSearch}`
            }

            if (isDDL) {
                url = `${url}&isDDL=${isDDL}`
            }
            
           const { data } = await instance.get(url, payload) 
           resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const createUser = (instance, payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { data } = await instance.post('/api/createUser', payload)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteUser = (instance, payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { data } = await instance.delete(`/api/user/remove/${payload}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const getUserProfile = (instance, payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { data } = await instance.get(`/api/getUserProfile/${payload}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const updateUserProfile = (instance, payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { data } = await instance.put('/api/profile/update', payload)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}