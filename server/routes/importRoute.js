const router = require('express').Router()
const { protect, adminRoute } = require('../middlewares/auth')
const { uploadImportFile } = require('../helpers/upload.helper')
const { importData } = require('../controllers/importController')

router.post('/data/import', protect, adminRoute, uploadImportFile.single('file'), importData)

module.exports = router