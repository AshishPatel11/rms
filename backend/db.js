const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1/RMS";

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true });
    var conn = mongoose.connection;
    conn.on('connected', () => {
        console.log('database is connected successfully');
    });
    conn.on('disconnected', () => {
        console.log('database is disconnected successfully');
    })
    conn.on('error', console.error.bind(console, 'connection error:'));
}
module.exports = connectToMongo;