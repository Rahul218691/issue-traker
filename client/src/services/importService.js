export const importUsersData = (url, instance, payload) => {
    return new Promise(async(resolve, reject) => {
        try {
            const { data } = await instance.post(url, payload)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}