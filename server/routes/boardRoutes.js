const router = require('express').Router()
const { protect, adminRoute } = require('../middlewares/auth')
const { createBoard, getProjectBoard } = require('../controllers/boardController.js')

router.get('/board/:projectId', getProjectBoard)

router.post('/create/board', protect, adminRoute, createBoard)

module.exports = router