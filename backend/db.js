const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/user";

const connectToMongo = () => {
    mongoose.connect(mongoURI,function(error){
        console.log(error);
    })
}
module.exports = connectToMongo;