const Board = require('../models/board')

const createNewBoard = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            Board.create(payload)
            .then(() => resolve(true))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
} 

module.exports = {
    createNewBoard
}