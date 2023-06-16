const express = require('express');
const router = express.Router();
const User = require('../models/Course');
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');

router.post('/addcourse', [
    body('courseName', 'Enter a valid name').trim(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let course = await User.findOne({ courseName: req.body.courseName, courseDura: req.body.courseDura });
        if (course) {
            return res.status(400).json({ error: "Sorry a course with this name already exists !!" })
        }

        // Create a new user
        course = await Course.create({
            courseName: req.body.courseName,
            courseDura: req.body.courseDura,
            sem: req.body.sem,
        });
        res.json(course)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router