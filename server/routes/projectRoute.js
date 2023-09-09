const router = require('express').Router()
const { protect, adminRoute } = require('../middlewares/auth')
const { createProject, getProjects, deleteProject } = require('../controllers/projectController')

router.get('/projects', protect, getProjects)

router.post('/project/create', protect, adminRoute, createProject)

router.delete('/project/delete/:id', protect, adminRoute, deleteProject)

module.exports = router