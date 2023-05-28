const express = require('express');
// const app = express();
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
        // connecting to SMTP Server with gmail:-
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'ashishpatel287680@gmail.com',
                pass: 'elxzerajexrjvreb',
            },
        });
        let info = await transporter.sendMail({
            from: '"Ashish Patel" <ashishpatel287680@gmail.com>', // sender address
            to: "ashishcoc1105@gmail.com", // list of receivers
            subject: "Hello dixit", // Subject line
            text: `http://localhost:3000/${authtoken}`, // plain text body
            html: `<b>http://localhost:3000/${authtoken}</b>`, // html body
        })
        console.log("Message sent: %s", info.messageId);
        res.json(info);
    } catch (error) {

    }
})
module.exports = router