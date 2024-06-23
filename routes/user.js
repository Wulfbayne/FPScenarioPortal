const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const user = require("../schemas/user.js")

router.get('/', async (req,res) => {
    const userData = await user.find({}).select("name uid role");
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
        role: req.body.role,
    });
    const hashed = new_user.generateHash(req.body.password);
    hashed.then( async (hash) =>{
        new_user.password = hash;
        try {
            const result = await user.insertMany(new_user);    
            res.send(result);
        } catch (error) {
            res.send(error.code.toString());
        }
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
    let target = await user.find({name: req.body.name});
    console.log(target);
    if (!target){
        res.send({result: false});
    }else{
        let isValid = await bcrypt.compare(req.body.password, target[0].password);
        res.send({result: isValid, role: target[0].role, name: target[0].name});
    }
})

module.exports = router;