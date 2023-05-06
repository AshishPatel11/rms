const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const { query, validationResult } = require('express-validator');

router.post('/login', async (req, res) => {
    const { userName } = req.body;
    try {
        let user = User.finfOne({ userName })
        if (!user) {
            return res.send(400).json({error: "user not found"})
        }
        res.send("hello");
    } catch (error) {

    }
})
module.exports = router