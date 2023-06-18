const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Sem = require('../models/Sem');
router.post('/fetchCourse', async (req, res) => {
    try {
        let course = await Course.find()
        if (course.length === 0) {
            return res.json({ error: "Courses not found" })
        }
        else {
            return res.json(course);
        }
    }
    catch (error) {
        console.log(error)
    }
})

//students myCourse fetch endpoint
router.post('/fetchMyCourse', async (req, res) => {
    try {
        let sem = await Sem.find({ cid: req.body.cid })
        if (sem.length === 0) {
            return res.json({ error: "sem not found" })
        }
        else {
            return res.json(sem);
        }
    }
    catch (error) {
        console.log(error)
    }
})
module.exports = router