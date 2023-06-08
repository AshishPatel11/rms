const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tyep: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('users', UserSchema)