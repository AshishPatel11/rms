const express = require('express');
const router = express.Router();
const Sem = require('../models/Sem.js')

router.post('/addSem', async (req, res) => {
    try {
        // Check whether the Sem with this name exists already
        let sem = await Sem.findOne({ cid: req.body.cid, semid: req.body.semid });
        if (sem) {
            return res.status(400).json({ error: "Sorry a semester in this course with this name already exists !!" })
        }

        // Create a new sem
        sem = await Sem.create({
            semid: req.body.semid,
            cid: req.body.cid,
            semName: req.body.semName,
            subCount: req.body.subCount,
            semno: req.body.semno,
        });
        res.json(sem)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router