const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 30*24*60*60*1000 }
    }
},{
	timestamps:true
})

module.exports = mongoose.model('RefreshToken', tokenSchema);