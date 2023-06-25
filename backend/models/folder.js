const mongoose = require('mongoose')
const { Schema } = mongoose;

const FolderSchema = new Schema({
    fid: {
        type: String,
        required: true
    },
    folderName: {
        type: String,
        required: true
    },
    subcode: {
        type: String
    },
    subName: {
        type: String
    }
})
module.exports = mongoose.model('folder', FolderSchema)