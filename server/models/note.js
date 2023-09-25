const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    note: {
        type: String,
        required: true
    },
    mentions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{
	timestamps:true
})

module.exports = mongoose.model('Note', noteSchema);