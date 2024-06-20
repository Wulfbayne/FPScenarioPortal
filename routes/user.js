const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const user = require("../models/userModel.js")

router.get('/', async (req,res) => {
    const userData = await user.find({}).select("name uid");
    res.json(userData);
})

router.get('/:id', async (req,res) => {
    const userData = await user.find({uid: req.params.id});
    res.json(userData);
})

router.post('/add', async (req, res) =>{
    let new_user = new user({
        name: req.body.name,
        uid: req.body.uid,
        role: req.body.rfid || "",
        team: req.body.team || "",
    });
    const hashed = new_user.generateHash(req.body.password);
    hashed.then( async (hash) =>{
        new_user.password = hash;
        const result = await user.insertMany(new_user);
        res.send(result);
    })
})

router.put('/:uid', async (req, res) =>{
    const uid = Number(res.params.uid);
    const data = req.body;
    const result = await user.updateOne({uid}, {$set: data});
    res.send(result);
})

router.delete('/:uid', async (req, res) =>{
    const uid = Number(res.params.uid);
    const result = await user.deleteOne({uid});
    res.send(result);
})

router.post("/login", async (req, res) =>{
    let target = await user.find({uid: req.body.uid});
    if (!target){
        res.send({result: false});
    }else{
        let isValid = await bcrypt.compare(req.body.password, target[0].password);
        res.send({result: isValid});
    }
})

module.exports = router;