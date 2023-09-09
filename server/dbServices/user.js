const User = require('../models/user')

const addNewUser = (data) => {
    return new Promise((resolve, reject) => {
        try {
            User.create(data)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const getUsers = (page, limit, skip, genericSearch, isDDL) => {
    return new Promise((resolve, reject) => {
        try {
            const projection = isDDL ? {
                "username": 1,
                "_id": 1,
                "profile": 1
            } : {
                "password": 0,
                "__v": 0,
                "verificationToken": 0,
                "userSlug": 0,
                "updatedAt": 0
            }
            const search = genericSearch ? 
            {
                username: {
                    $regex: genericSearch,
                    $options: "i"
                }
            } : {}
            User.aggregate([
                {
                    $match: {
                        role: {
                            $in: ['user', 'developer']
                        }
                    }
                },
                {
                    $match: search
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $project: projection
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

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            User.findById({_id: id})
            .select('-password')
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const removeUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            User.findByIdAndDelete(id).then(() => resolve(true))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            User.updateOne({
                _id: id
            }, {
                $set: data
            }, {
                new: true
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addNewUser,
    getUsers,
    findUserById,
    removeUserById,
    updateUser
}