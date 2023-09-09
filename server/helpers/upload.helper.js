const multer = require('multer');

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/profile");
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
});

const filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)     
    }
});


const uploadProfileImage = multer({storage: profileStorage});
const uploadImportFile = multer({storage:filestorage});

module.exports = {
	uploadProfileImage,
    uploadImportFile
}