const router = require('express').Router()
const { protect, adminRoute } = require('../middlewares/auth')
const { createBoard } = require('../controllers/boardController.js')

router.post('/create/board', protect, adminRoute, createBoard)

module.exports = router