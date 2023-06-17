const mongoose = require('mongoose')
const { Schema } = mongoose;

const JoinReqSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    cid: {
        type: String,
        required: true
    },
    userName: {
        type: String
    }
})
module.exports = mongoose.model('JoinReq', JoinReqSchema)