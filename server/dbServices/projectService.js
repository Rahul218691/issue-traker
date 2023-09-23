const Project = require('../models/project')

const newProject = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            Project.create(payload)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const projectList = (page, limit, skip, genericSearch, projectStatus, category, isAdmin, user, isDDL) => {
    return new Promise((resolve, reject) => {
        try {
            const projection = isDDL ? {
                "title": 1,
                "_id": 1
            } : {
                "title": 1,
                "startDate": 1,
                "totalAssignee": {
                    $size: "$assignee"
                },
                "assignee": {
                    $slice: ["$assignee", 5]
                },
                "projectStatus": 1
            } 
            const search = genericSearch ? 
            {
                title: {
                    $regex: genericSearch,
                    $options: "i"
                }
            } : {}
            const projectListCondition = isAdmin ? {} : {
                "assignee._id": String(user)
            }
            const categoryCondition = category ? {
                "category.value": category
            } : {}
            const statusCondition = category ? {
                "projectStatus": projectStatus
            } : {}
            Project.aggregate([
                { $match: projectListCondition },
                { $match: categoryCondition },
                { $match: statusCondition },
                { $match: search },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                { $project: projection },
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

const removeProjectById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Project.findByIdAndDelete(id)
            .then(() => resolve(true))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const fetchProjectById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Project.findById(id)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const fetchUserRelatedProjects = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Project.find({
                $or: [
                    {"assignee._id": id},
                    {"projectLead._id": id}
                ]
            }).select('_id')
            .then((data) => resolve(data))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const removeProjectLead = (id, projectList) => {
    return new Promise((resolve, reject) => {
        try {
            Project.updateMany({"_id": { $in: [...projectList] }},
                [
                    {
                        $set: {
                            "projectLead": {
                                "$cond": {
                                    "if": {
                                        "$eq": [
                                            "$projectLead._id", id
                                        ]
                                    },
                                    "then": {},
                                    "else": "$projectLead"
                                }
                            }
                        },
                        
                    }
                ], {
                multi: true
            }).then(() => resolve(true))
            .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const removeAssigneeFromProject = (id, projectList) => {
    return new Promise((resolve, reject) => {
        try {
            Project.updateMany({"_id": { $in: [...projectList] }},
            {
                $pull: {
                    "assignee": {
                        "_id": id
                    }
                },
            }, {
            multi: true
        }).then(() => resolve(true))
        .catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    newProject,
    projectList,
    removeProjectById,
    fetchProjectById,
    removeProjectLead,
    fetchUserRelatedProjects,
    removeAssigneeFromProject
}