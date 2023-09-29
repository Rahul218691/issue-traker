const { createNewBoard, getBoardData } = require("../dbServices/boardService");

const createBoard = async(req, res) => {
    try {
        await createNewBoard(req.body)
        res.status(200).json({
            msg: 'Board created successfully'
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getProjectBoard = async(req, res) => {
    try {
        const { projectId } = req.params
        const board = await getBoardData(projectId)
        const response = {
            data: board.length ? board[0] : {}
        }
        res.json(response)
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports = {
    createBoard,
    getProjectBoard
}