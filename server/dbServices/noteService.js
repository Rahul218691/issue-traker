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
            Note.aggregate([
                { $match: { projectId } },
                { $sort: { createdAt: -1 } },
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

module.exports = {
    newNote,
    getNotes,
    removeNote
} 