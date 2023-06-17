const mongoose = require('mongoose')
const { Schema } = mongoose;

const CourseSchema = new Schema({
    cid: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true,
    },
    courseDura: {
        type: String,
        required: true
    },
    sem: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('course', CourseSchema)