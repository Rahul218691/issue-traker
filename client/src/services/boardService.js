export const createBoard = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance } = payload
            const { data } = await instance.post('/api/create/board', payload.data)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const getBoard = (payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { instance } = payload
            const { data } =  await instance.get(`/api/board/${payload.id}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}