const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
router.post('/fetchCourse', async (req, res) => {
    try {
        let course = await Course.find()
        if (course.length===0) {
            return res.status(400).json({ error: "Courses not found" })
        }
        else {
            return res.send(course);
        }
    }
    catch (error) {
        console.log(error)
    }
})
module.exports = router