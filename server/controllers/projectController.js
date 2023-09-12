const { newProject, projectList, removeProjectById, fetchProjectById } = require('../dbServices/projectService')

const createProject = async(req, res) => {
    try {
        const newProj = await newProject(req.body)
        res.status(201).json({
            msg: 'Project created successfully',
            project: newProj
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getProjects = async(req, res) => {
    try {
        const userRole = req.user.role
        const user = req.user._id
        const isAdmin = userRole === 'admin'
        let { page, limit, genericSearch, projectStatus, category } = req.query
        limit = limit ? Number(limit) : 10
        page = page ? Number(page) : 1
        const skip = (page - 1) * limit
        const projects = await projectList(page, limit, skip, genericSearch, projectStatus, category, isAdmin, user)
        const projectData = {
            data: projects.length ? projects[0].data : [],
            totalPages: projects.length ? projects[0].totalPages : 0,
            totalCount: projects.length ? projects[0].totalCount : 0,
            hasNextPage: projects.length ? projects[0].hasNextPage : false,
            hasPreviousPage: projects.length ? skip > 0 : false,
            pageNumber: projects.length ? projects[0].page : 1,
            pageSize: limit
        } 
        return res.json(projectData)
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const deleteProject = async(req, res) => {
    try {
        const {id} = req.params
        if (!id) return res.status(400).json({msg: 'Failed to delete project'})
        await removeProjectById(id)
        res.json({
            msg: 'Project deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getProjectById = async(req, res) => {
    try {
        const { id } = req.params
        const project = await fetchProjectById(id)
        return res.json(project)
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports = {
    createProject,
    getProjects,
    deleteProject,
    getProjectById
}