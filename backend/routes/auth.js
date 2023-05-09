const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ashishpatel';
// let rand = function () {
//     return Math.random().toString(36).substr(2); // remove `0.`
// };
// let token = function () {
//     return rand() + rand() + rand(); // to make it longer
// };

// token();
router.post('/login', async (req, res) => {
    const { userName } = req.body;
    try {
        let user = await User.findOne({ username: userName })
        if (!user) {
            return res.json({ error: "user not found" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        return res.json(authtoken);
    } catch (error) {

    }
})
module.exports = router