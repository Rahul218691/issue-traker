export const createProject = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance } = payload
            const { data } = await instance.post('/api/project/create', payload)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const fetchProjects = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance, page, limit, genericSearch, projectStatus, category } = payload
            let url = `/api/projects?page=${page}&limit=${limit}`
            if (genericSearch) {
                url = `${url}&genericSearch=${genericSearch}`
            }
            if (projectStatus) {
                url = `${url}&projectStatus=${projectStatus}`
            }
            if (category) {
                url = `${url}&category=${category}`
            }
            const { data } = await instance.get(url, payload)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteProject = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance } = payload
            const { data } = await instance.delete(`/api/project/delete/${payload.id}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
