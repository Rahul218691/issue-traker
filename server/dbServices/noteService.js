const mongoose = require('mongoose')
const Note = require('../models/note')

const newNote = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            Note.create(payload)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const getNotes = (page, limit, skip, projectId) => {
    return new Promise((resolve, reject) => {
        try {
            const objectIdConvert = new mongoose.Types.ObjectId(projectId)
            Note.aggregate([
                { $match: { projectId: objectIdConvert } },
                { $sort: { createdAt: -1 } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'mentions',
                        foreignField: '_id',
                        pipeline: [
                            {
                                $project: {
                                    "username": 1,
                                    "_id": 1
                                }
                            }
                        ],
                        as: 'mentions'
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: 'totalCount' }],
                        data: [
                            {
                                $skip: skip
                            },
                            {
                                $limit: limit
                            }
                        ]
                    }
                },
                {
                    $unwind: '$metadata'
                },
                {
                    $project: {
                        totalPages: {
                            $ceil: {
                                $divide: ['$metadata.totalCount', limit]
                            }
                        },
                        totalCount: '$metadata.totalCount',
                        data: 1,
                        hasNextPage: {
                            $lt: [{ $multiply: [limit, Number(page)] }, '$metadata.totalCount']
                        },
                        page: {
                            $literal: skip / limit + 1
                        }
                    }
                }
            ]).then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const removeNote = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Note.findByIdAndDelete(id)
            .then(() => resolve(true))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const bulkDeleteNotes = (id) => {
    return new Promise((resolve, reject) => {
        Note.deleteMany({
            projectId: new mongoose.Types.ObjectId(id)
        }).then(() => resolve(true))
        .catch((err) => reject(err))
    })
}

module.exports = {
    newNote,
    getNotes,
    removeNote,
    bulkDeleteNotes
} 