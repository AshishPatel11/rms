const mongoose = require('mongoose')
const { Schema } = mongoose;

const SemSchema = new Schema({
    semid: {
        type: String,
        required: true
    },
    cid: {
        type: String,
        required: true
    },
    semName: {
        type: String
    },
    subCount: {
        type: Number
    },
    semno: {
        type: Number
    }
})
module.exports = mongoose.model('Sem', SemSchema)