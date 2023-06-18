const mongoose = require('mongoose')
const { Schema } = mongoose;

const SubSchema = new Schema({
    semid: {
        type: String,
        required: true
    },
    cid: {
        type: String,
        required: true
    },
    subcode: {
        type: String,
        required: true
    },
    subName: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Sub', SubSchema)