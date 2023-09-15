const router = require('express').Router()
const { protect, adminRoute } = require('../middlewares/auth')
const { createNote, getProjectNotes, deleteNote } = require('../controllers/noteController')

router.get('/project/notes/:projectId', protect, getProjectNotes)

router.post('/note/create', protect, adminRoute, createNote)

router.delete('/note/:id', protect, adminRoute, deleteNote)

module.exports = router