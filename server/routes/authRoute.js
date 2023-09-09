const router = require('express').Router()
const { userSigninValidator } = require('../utils/validators/auth')
const { runValidation } = require('../utils/validators') 
const { userLogin, logout, getRefreshedToken } = require('../controllers/authController')

router.post('/login', userSigninValidator, runValidation, userLogin)
router.post('/logout', logout)
router.post('/refresh_token', getRefreshedToken)

module.exports = router