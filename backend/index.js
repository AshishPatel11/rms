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
app.use('/api/auth', require('./routes/auth'));
//creating bucket
let bucket;
mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "MCA.DS"
    });
});

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
                bucketName: "MCA.DS"
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({
    storage
});

app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200)
        .send("File uploaded successfully");
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})