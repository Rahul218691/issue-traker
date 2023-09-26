const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        tags: [String],
        priority: {
            type: String
        },
        taskCategory: {
            type: Object
        },
        attachments: {
            type: Array
        },
        lastUpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
},{
	timestamps:true
})

module.exports = mongoose.model('Task', taskSchema);