const express = require('express');
// const app = express();
const router = express.Router();
const User = require('../models/User');
const nodemailer = require("nodemailer");

router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }
        function generateOTP() {

            // Declare a digits variable 
            // which stores all digits
            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 6; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        }
        // generating authtoken and sending mail with nodemailer:-
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
        const loginOTP = generateOTP();
        sessionStorage.setItem('OTP',loginOTP)
        let info = await transporter.sendMail({
            from: '"Ashish Patel" <ashishpatel287680@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Hello dixit", // Subject line
            text: `Your OTP for login is ${loginOTP}`, // plain text body
            html: `<b>Your OTP for login is ${loginOTP}</b>`, // html body
        })
        console.log("Message sent: %s", info.messageId);
        res.json(user);
    } catch (error) {

    }
})
module.exports = router