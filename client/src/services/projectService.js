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
            const { instance, page, limit, genericSearch, projectStatus, category, isDDL } = payload
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

export const getProjectById = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance } = payload
            const { data } = await instance.get(`/api/project/${payload.id}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const createProjectNote = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance } = payload
            const { data } = await instance.post(`/api/note/create`, payload)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const getProjectNotes = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance, projectId, page, limit } = payload
            const { data } = await instance.get(`/api/project/notes/${projectId}?page=${page}&limit=${limit}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteProjectNote = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance, id } = payload
            const { data } = await instance.delete(`/api/note/${id}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}