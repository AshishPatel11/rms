const express = require('express');
const router = express.Router();
const Sub = require('../models/Sub.js')

router.post('/addSub', async (req, res) => {
    try {
        // Check whether the Sem with this name exists already
        let sub = await Sub.findOne({ cid: req.body.cid, subcode: req.body.subcode });
        if (sub) {
            return res.status(400).json({ error: "Sorry a semester in this course with this name already exists !!" })
        }

        // Create a new sem
        sub = await Sub.create({
            semid: req.body.semid,
            cid: req.body.cid,
            subcode: req.body.subcode,
            subName: req.body.subName,
            semName: req.body.semName,
        });
        res.json(sub)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



router.post('/fetchSub', async (req, res) => {
    try {
        let sub = await Sub.find({ semName: req.body.semName })
        if (sub.length === 0) {
            return res.json({ error: "subjects not found" })
        }
        else {
            return res.json(sub);
        }
    }
    catch (error) {
        console.log(error)
    }
})
module.exports = router