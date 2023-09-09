const csv = require('csvtojson')
const fs = require('fs')
const { randomNumber } = require('unique-random-number-gen')

const { insertUsers } = require('../dbServices/importService')

const importData = async(req, res) => {
    try {
        const { type } = req.body
        const jsonArray = await csv().fromFile(req.file.path);
        if (type === "users") {
            const result = jsonArray.map((data) => {
                return {
                    ...data,
                    userSlug: randomNumber('string'),
                    password: ''
                }              
            })
            await insertUsers(result)
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            res.json({
                msg: 'Users Imported Sucessfully'
            })
        }
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports = {
    importData
}