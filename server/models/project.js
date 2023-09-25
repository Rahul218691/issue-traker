const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    projectLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    category: {
        type: Array
    },
    projectStatus: {
        type:String,
        enum: ['approved','inprogress','validation','completed'],
		default:'approved'
    }
},{
	timestamps:true
})

module.exports = mongoose.model('Project', projectSchema);