const User = require('../models/user')

const insertUsers = (data) => {
    return new Promise((resolve, reject) => {
        try {
            User.insertMany(data)
            .then(() => resolve(true))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    insertUsers
}