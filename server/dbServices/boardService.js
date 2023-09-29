const mongoose = require('mongoose')
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

const getBoardData = (projectId) => {
    return new Promise((resolve, reject) => {
        try {
            const objectIdConvert = new mongoose.Types.ObjectId(projectId)
            Board.aggregate([
                {$match: { projectId: objectIdConvert }},
                {$project: {
                    "__v": 0,
                    "updatedAt": 0,
                    "createdAt": 0
                }}
            ]).then((data) => resolve(data))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewBoard,
    getBoardData
}