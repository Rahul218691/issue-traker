const { createNewBoard } = require("../dbServices/boardService");

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

module.exports = {
    createBoard
}