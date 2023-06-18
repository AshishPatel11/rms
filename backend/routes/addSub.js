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
        });
        res.json(sub)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router