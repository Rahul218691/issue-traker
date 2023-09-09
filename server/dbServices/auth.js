const User = require('../models/user')
const TokenSchema = require('../models/token')

const checkUserExists = (email) => {
    return new Promise((resolve, reject) => {
        try {
            User.findOne({email})
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const getUserRefreshToken = (uid) => {
    return new Promise((resolve, reject) => {
        try {
            TokenSchema.findOne({userId: uid})
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const storeUserRefreshToken = (uid, token) => {
    return new Promise((resolve, reject) => {
        try {
            const payload = {
                userId: uid,
                token
            }
            TokenSchema.create(payload)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUserToken = (uid) => {
    return new Promise((resolve, reject) => {
        try {
            TokenSchema.deleteOne({
                userId: uid
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    checkUserExists,
    getUserRefreshToken,
    storeUserRefreshToken,
    deleteUserToken
}