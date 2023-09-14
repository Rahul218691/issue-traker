const User = require('../models/user')
const { randomNumber } = require('unique-random-number-gen')
const fs = require('fs')
const path = require('path')
const { hashPassword } = require('../helpers/bcrypt.helper')
const { addNewUser, getUsers, removeUserById, findUserById, updateUser } = require('../dbServices/user')
const { checkUserExists } = require('../dbServices/auth')
const { fetchUserRelatedProjects, removeProjectLead, removeAssigneeFromProject } = require('../dbServices/projectService')

const createUser = async(req, res) => {
    try {
        const {email,password,username,role} = req.body;
        const user = await checkUserExists(email);
        if (user) return res.status(400).json({msg:'User with this email already exists!'});
        const passwordHashed = await hashPassword(password)
        const uniqueUserId = randomNumber('string')
        const payload = {
            email,
            username,
            password: passwordHashed,
            role,
            userSlug: uniqueUserId
        }
        const newUser = await addNewUser(payload)
        return res.status(201).json({
            msg: 'User Created',
            newUser
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getAllUsers = async(req, res) => {
    try {
        let { page, limit, genericSearch, isDDL } = req.query
        limit = limit ? Number(limit) : 10
        page = page ? Number(page) : 1
        const skip = (page - 1) * limit
        const users = await getUsers(page, limit, skip, genericSearch , isDDL)
        const userData = {
            data: users.length ? users[0].data : [],
            totalPages: users.length ? users[0].totalPages : 0,
            totalCount: users.length ? users[0].totalCount : 0,
            hasNextPage: users.length ? users[0].hasNextPage : false,
            hasPreviousPage: users.length ? skip > 0 : false,
            pageNumber: users.length ? users[0].page : 1,
            pageSize: limit
        } 
        return res.status(200).json(userData)
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const deleteUser = async(req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({msg: 'Failed to delete user'})
        const userProjects = await fetchUserRelatedProjects(id)
        if (userProjects.length) {
            await removeProjectLead(id, userProjects)
            await removeAssigneeFromProject(id, userProjects)
        }
        await removeUserById(id)
        res.json({
            msg: 'User Deleted Sucessfully'
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getUserProfile = async(req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({msg: 'Failed to fetch user'})
        const user = await findUserById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const updateUserProfile = async(req, res) => {
    try {
        const userId = req.user._id
        const { username, phone, address, websiteURL, linkedinURL, githubURL, oldProfileImage } = req.body
        let payload = {
            username,
            phone,
            address,
            websiteURL,
            linkedinURL,
            githubURL
        }
        if (req.file) {
         const fileUrl = `${process.env.SERVER_BASE_URL}/profile/${req.file.filename}`;
         payload.profile = fileUrl
         if (!oldProfileImage.includes('rahulcloudstorage')) {
            const pathInfo = path.join(__dirname, '../uploads/profile')
            const oldFileName = oldProfileImage.split('profile/')[1]
            fs.unlink(`${pathInfo}/${oldFileName}`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
         }
        }
        const response = await updateUser(userId, payload)
        return res.status(204).json(response)
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}


module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    getUserProfile,
    updateUserProfile
}