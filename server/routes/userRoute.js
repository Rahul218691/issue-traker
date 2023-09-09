const router = require('express').Router()
const { userCreateValidator } = require('../utils/validators/auth')
const { runValidation } = require('../utils/validators') 
const { protect, adminRoute } = require('../middlewares/auth')
const { createUser, getAllUsers, getUserProfile, deleteUser, updateUserProfile } = require('../controllers/userController')
const { uploadProfileImage } = require('../helpers/upload.helper')

router.get('/getUsers', protect, getAllUsers)
router.get('/getUserProfile/:id', protect, getUserProfile)

router.post('/createUser', protect, adminRoute, userCreateValidator, runValidation, createUser)

router.put('/profile/update', protect, uploadProfileImage.single('profile'), updateUserProfile)

router.delete('/user/remove/:id', protect, adminRoute, deleteUser)

module.exports = router