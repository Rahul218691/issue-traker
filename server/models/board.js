const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    columns: [
        {
            title: {
                type: String,
                required: true
            },
            tasks: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Task'
                }
            ]
        }
    ]
},{
	timestamps:true
})

module.exports = mongoose.model('Board', boardSchema);