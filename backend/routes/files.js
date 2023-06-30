const express = require('express');
const router = express.Router();
const Filesdata = require('../models/Filesdata');

router.post('/filedata', async (req, res) => {
    try {

        let fileData = await Filesdata.create({
            fileid: req.body.fileid,
            fileName: req.body.fileName,
            subcode: req.body.subcode,
            fid: req.body.fid,
        });
        res.json(fileData)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/fetchfiledata', async (req, res) => {
    try {
        let fileData = await Filesdata.find({ subcode: req.body.subcode, fid: req.body.fid })
        if (fileData.length === 0) {
            return res.json({ error: "files not found" })
        }
        else {
            return res.json(fileData);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router