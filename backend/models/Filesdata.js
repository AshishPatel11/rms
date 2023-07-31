const mongoose = require('mongoose');
const { Schema } = mongoose;

const FiledataSchema = new Schema({
    fileid: {
        type: String,
        required: true
    },
    fileName: {
        type: String
    },
    subcode: {
        type: String,
    },
    fid: {
        type: String,
    },
    uid: {
        type: String,
    },
    userName: {
        type: String,
    }

})
module.exports = mongoose.model('filedata', FiledataSchema)