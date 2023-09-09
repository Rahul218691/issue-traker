const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		maxLength:20,
		trim:true,
		required:true,
        index: true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		trim:true,
        index: true
	},
	password:{
		type:String,
		trim:true
	},
	profile:{
		type:String,
		default:'https://res.cloudinary.com/rahulcloudstorage/image/upload/v1591775417/images_lg4hyi.png'
	},
	role:{
		type:String,
        enum: ['user','developer','admin'],
		default:'developer'
	},
	verificationToken: {
		type: String,
		default: ""
	},
	userSlug: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
		trim: true,
		default: ''
	},
	address: {
		type: String,
		trim: true,
		default: ''
	},
	websiteURL: {
		type: String,
		trim: true,
		default: ''
	},
	linkedinURL: {
		type: String,
		trim: true,
		default: ''
	},
	githubURL: {
		type: String,
		trim: true,
		default: ''
	},
	designation: {
		type: String,
		trim: true,
		default: ''
	}
},{
	timestamps:true
})

module.exports = mongoose.model('User', userSchema);