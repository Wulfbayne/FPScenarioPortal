import express from "express";
const router = express.Router();
import Player from "../schemas/player";

interface CustomError extends Error {
    code?: string;
}

router.get('/', async (req,res) => {
    const userData = await Player.find({}).select("name uid role");
    res.json(userData);
})

router.get('/:id', async (req,res) => {
    const userData = await Player.find({uid: req.params.id});
    res.json(userData);
})

router.post('/add', async (req, res) =>{
    let new_player = new Player({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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

    try{
        const result = await Player.insertMany(new_player);
        res.send(result);
    }
    catch(error){
        const customError = error as CustomError;
        res.send(customError.code ? customError.code : customError.message);
    }
})

router.put('/:uid', async (req, res) =>{
    const uid = Number(req.params.uid);
    const data = req.body;
    const result = await Player.updateOne({uid}, {$set: data});
    res.send(result);
})

router.delete('/:uid', async (req, res) =>{
    const uid = Number(req.params.uid);
    const result = await Player.deleteOne({uid});
    res.send(result);
})

router.delete('/empty', async (req, res) =>{
    const result = await Player.deleteMany({});
    res.send(result);
})

export default router;