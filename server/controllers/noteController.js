const { newNote, getNotes, removeNote } = require('../dbServices/noteService')

const createNote = async(req, res) => {
    try {
        const note = await newNote(req.body)
        res.status(201).json({
            msg: 'Note added successfully',
            note
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getProjectNotes = async(req, res) => {
    try {
        const { projectId } = req.params
        let { page, limit } = req.query
        if (!projectId) return res.status(400).json({ msg: 'ProjectId is required' })
        limit = limit ? Number(limit) : 10
        page = page ? Number(page) : 1
        const skip = (page - 1) * limit
        const notes = await getNotes(page, limit, skip, projectId)
        const notesData = {
            data: notes.length ? notes[0].data : [],
            totalPages: notes.length ? notes[0].totalPages : 0,
            totalCount: notes.length ? notes[0].totalCount : 0,
            hasNextPage: notes.length ? notes[0].hasNextPage : false,
            hasPreviousPage: notes.length ? skip > 0 : false,
            pageNumber: notes.length ? notes[0].page : 1,
            pageSize: limit
        } 
        return res.json(notesData)
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const deleteNote = async(req, res) => {
    try {
        const {id} = req.params
        if (!id) return res.status(400).json({msg: 'Failed to delete project'})
        await removeNote(id)
        res.json({
            msg: 'Note deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports = {
    createNote,
    getProjectNotes,
    deleteNote
}