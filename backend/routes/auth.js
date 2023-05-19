const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const JWT_SECRET = 'ashishpatel';

router.post('/login', async (req, res) => {
    const { userName } = req.body;
    try {
        let user = await User.findOne({ username: userName })
        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        // generating authtoken and sending mail with nodemailer:-
        const authtoken = jwt.sign(data, JWT_SECRET);
        let testAccount = await nodemailer.createTestAccount();
        // connecting to SMTP Server
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: 'janiya.armstrong@ethereal.email',
                pass: '6GYJFAXNdHP2rNXjJu',
            },
        });
        let info = await transporter.sendMail({
            from: '"Ashish Patel" <janiya.armstrong@ethereal.email>', // sender address
            to: "ashishcoc1105@gmail.com", // list of receivers
            subject: "Hello dixit", // Subject line
            text: "Hello world hahahahaha", // plain text body
            html: "<b>Hello world hahahahaha</b>", // html body
        })
        console.log("Message sent: %s", info.messageId);
        res.json(info);
    } catch (error) {

    }
})
module.exports = router