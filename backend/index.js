const connectToMongo = require('./db');
const express = require('express');
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")

require("dotenv").config();
connectToMongo();
const mongouri = 'mongodb://127.0.0.1/RMS';

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});
const app = express()
const port = 5000
app.use(bodyParser.json());
app.use(methodOverride('_method'));
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
//to parse json content
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
const storage = new GridFsStorage({
    url: mongouri,
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
Grid.mongo = mongoose.mongo;
const conn = mongoose.createConnection(mongouri);
let gfs;
let gridBucket = conn.once("open", () => {

    gfs = Grid(conn.db);
    gfs.collection('uploads');
    gridBucket = gfs;
});

app.get("/fileinfo/:filename", (req, res) => {
    try {
        console.log(gfs)
        const filename = req.params.filename;
        let file = gridBucket.files.find({ filename: filename }).toArray((err, result) => {
            if (err) {
                res.send(err.message)
            }
            else {
                if (!result || result.length === 0) {
                    res.send({ msg: "file not found" })
                }
                else {
                    gridBucket.createReadStream(filename).pipe(result)
                    res.send({ msg: "ok" })
                }
            }
        })
        // console.log(file)
    }
    catch (error) {
        res.send(error.message)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})