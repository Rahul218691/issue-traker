const router = require('express').Router()
const { protect, adminRoute } = require('../middlewares/auth')
const { createProject, getProjects, deleteProject, getProjectById } = require('../controllers/projectController')

router.get('/projects', protect, getProjects)
router.get('/project/:id', protect, getProjectById)

router.post('/project/create', protect, adminRoute, createProject)

router.delete('/project/delete/:id', protect, adminRoute, deleteProject)

module.exports = router