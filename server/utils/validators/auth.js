const {check} = require('express-validator');

exports.userSigninValidator = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({min:6}).withMessage('Invalid Password')
]

exports.userCreateValidator = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({min:6}).withMessage('Password must be minimum 6 character long'),
    check('username').not().isEmpty().withMessage('UserName is Required'),
    check('role').not().isEmpty().withMessage('Role is Required')
]