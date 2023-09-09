const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt.helper')
const { createAccesToken, createRefreshToken, verifyRefreshToken } = require('../helpers/jwt.helper')
const { getUserRefreshToken, storeUserRefreshToken, checkUserExists, deleteUserToken } = require('../dbServices/auth')
const { findUserById } = require('../dbServices/user')

const userLogin = async(req, res) => {
    try {
        const {email,password} = req.body;
        const user = await checkUserExists(email);
        if (!user) return res.status(400).json({msg:'User with this email does not exists!'});
        const isPasswordMatch = await comparePassword(password, user.password)
        if (!isPasswordMatch) return res.status(400).json({msg:'Invalid User Credentials'});
        const access_token = createAccesToken({id:user._id});
		const refresh_token = createRefreshToken({id:user._id});
		const tokenExist = await getUserRefreshToken(user.userSlug)
        if (tokenExist) {
            await deleteUserToken(user.userSlug)
        }
        await storeUserRefreshToken(user.userSlug, refresh_token)
        res.status(200).json({
            msg: 'Login Success',
            access_token,
            user: {
                ...user._doc,
                password: ''
            }
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getRefreshedToken = async(req, res) => {
    try {
		const { userId } = req.body
		const userToken = await getUserRefreshToken(userId)
		if(!userToken) return res.status(500).json({msg:"Please Login to Continue"});
		const result = verifyRefreshToken(userToken.token);
		if(result){
			const user = await findUserById(result.id)
			if(!user){
				return res.status(400).json({msg:'User does not exists'})
			}else{
				const access_token = createAccesToken({id:result.id});
				res.status(200).json({
					access_token,
					user
				})
			}
		}else{
			return res.status(400).json({
				msg:'Please Login to Continue'
			})
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const logout = async(req,res) =>{
	try {	
		const { userId } = req.body
		await deleteUserToken(userId)
		res.json({
			msg: 'Logged out successfully!'
		})
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

module.exports = {
    userLogin,
    getRefreshedToken,
    logout
}