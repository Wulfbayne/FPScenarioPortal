import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import User from "../schemas/user";

interface CustomError extends Error {
    code?: string;
}

router.get('/', async (req,res) => {
    const userData = await User.find({}).select("name uid role");
    res.json(userData);
})

router.get('/:id', async (req,res) => {
    const userData = await User.find({uid: req.params.id});
    res.json(userData);
})

router.post('/add', async (req, res) =>{
    let new_user = new User({
        name: req.body.name,
        uid: req.body.uid,
        role: req.body.role,
    });
    const hashed = new_user.generateHash(req.body.password);
    hashed.then( async (hash: string) =>{
        new_user.password = hash;
        try {
            const result = await User.insertMany(new_user);    
            res.send(result);
        } catch (error) {
            const customError = error as CustomError;
            res.send(customError.code ? customError.code : customError.message);
        }
    })
})

router.put('/:uid', async (req, res) =>{
    const uid = Number(req.params.uid);
    const data = req.body;
    const result = await User.updateOne({uid}, {$set: data});
    res.send(result);
})

router.delete('/:uid', async (req, res) =>{
    const uid = Number(req.params.uid);
    const result = await User.deleteOne({uid});
    res.send(result);
})

router.post("/login", async (req, res) =>{
    let target = await User.find({name: req.body.name});
    console.log(target);
    if (!target){
        res.send({result: false});
    }else{
        let isValid = await bcrypt.compare(req.body.password, target[0].password);
        res.send({result: isValid, role: target[0].role, name: target[0].name});
    }
})

export default router;