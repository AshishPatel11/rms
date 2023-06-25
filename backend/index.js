const connectToMongo = require('./db');
const express = require('express');
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();
connectToMongo();
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});
const app = express()
const port = 5000
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/adduser'));
app.use('/api/auth', require('./routes/addCourse'));
app.use('/api/auth', require('./routes/fetchCourse'));
app.use('/api/auth', require('./routes/joinReq'));
app.use('/api/auth', require('./routes/addSem'));
app.use('/api/auth', require('./routes/addSub'));
app.use('/api/auth', require('./routes/folders'));
app.use('/api/auth', require('./routes/files'));
// eslint-disable-next-line no-unused-vars
// let bucket;
// mongoose.connection.on("connected", () => {
//     var db = mongoose.connections[0].db;
//     bucket = new mongoose.mongo.GridFSBucket(db, {
//         bucketName: "MCA.DS"
//     });
// });

//to parse json content
app.use(express.json());
//to parse body from url
app.use(express.urlencoded({
    extended: false
}));
const storage = new GridFsStorage({
    url: "mongodb://127.0.0.1/RMS",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: "uploads"
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).send(req.file);
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})