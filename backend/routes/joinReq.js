const express = require('express');
const router = express.Router();
const JoinReq = require('../models/JoinReq.js');
const User = require('../models/User.js');
router.post('/joinreq', async (req, res) => {
    try {
        // Check whether the user with this email exists already
        let joinreq = await JoinReq.findOne({ uid: req.body.uid, cid: req.body.cid });
        if (joinreq) {
            return res.status(400).json({ error: "Sorry a Request for the course is already sent" })
        }

        // Create a new user
        joinreq = await JoinReq.create({
            uid: req.body.uid,
            cid: req.body.cid,
            userName: req.body.userName,
        });
        res.json(joinreq)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//fetching the request of join
router.post('/fetchJoiReq', async (req, res) => {
    try {
        let fetchreq = await JoinReq.find()
        if (fetchreq.length === 0) {
            return res.json({ msg: "No Pending Requests" });
        }
        else {
            return res.json(fetchreq);
        }
    }
    catch (error) {
        console.log(error)
    }
})


//after approval or rejection
router.post('/approvedJoin', async (req, res) => {
    try {
        let approveJoin = await User.findOneAndUpdate({ uid: req.body.uid }, { cid: req.body.cid }, { new: true })
        if (approveJoin.cid) {
            let deleteAppr = await JoinReq.deleteOne({ uid: req.body.uid, cid: req.body.cid })
            if (deleteAppr.deletedCount === 1) {
                return res.json({ msg: "approved" });
            }
        }
        else {
            return res.json({ msg: "couldn't Approved !!" });
        }
    }
    catch (error) {
        console.log(error)
    }
})

// rejection of request
router.post('/RejectJoin', async (req, res) => {
    try {
        let deleteAppr = await JoinReq.deleteOne({ uid: req.body.uid, cid: req.body.cid })
        if (deleteAppr.deletedCount === 1) {
            return res.json({ msg: "Rejected" });
        }
    }
    catch (error) {
        console.log(error)
    }
})
module.exports = router