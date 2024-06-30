const express = require("express");
const router = express.Router();
const player = require("../schemas/player.js")

router.get('/', async (req,res) => {
    const userData = await user.find({}).select("name uid");
    res.json(userData);
})

router.post('/add', async (req, res) =>{
    let new_user = new user({
        name: req.body.name,
        uid: req.body.uid,
        team: req.body.team || "",
        unit: req.body.unit || "",
        paintAmt: req.body.paintAmt || "0",
        paintType: req.body.paintType || "None",
        checkedIn: req.body.checkedIn || false,
        hasBadge: req.body.hasBadge || false,
        hasRFID: req.body.hasRFID || false,
        rfid: req.body.rfid || "",
    });
    // const hashed = new_user.generateHash(req.body.password);
    // hashed.then( async (hash) =>{
    //     new_user.password = hash;
        
    // })
    const result = await user.insertMany(new_user);
        res.send(result);
})













module.exports = router;