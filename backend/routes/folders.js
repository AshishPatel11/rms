const express = require('express');
const router = express.Router();
const Folder = require('../models/folder');

router.post('/addFolder', async (req, res) => {
    try {
        let folder = await Folder.findOne({ fid: req.body.fid });
        if (folder) {
            return res.status(400).json({ error: "Sorry a folder with this name already exists !!" })
        }
        // Create a new folder
        folder = await Folder.create({
            fid: req.body.fid,
            folderName: req.body.folderName,
            subcode: req.body.subcode,
            subName: req.body.subName,
        });
        res.json(folder)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//fetch folders
router.post('/fetchFolder', async (req, res) => {
    try {
        let folder = await Folder.find({ subcode: req.body.subcode })
        if (folder.length === 0) {
            return res.json({ error: "folders not found" })
        }
        else {
            return res.json(folder);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router