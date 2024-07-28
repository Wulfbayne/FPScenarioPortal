import express from 'express';
import { Prop, SectorProp } from '../schemas/prop'; // import your models and interfaces

const router = express.Router();


// GET route for all props
router.get('/', async (req, res) => {
    try {
      const props = await Prop.find();
      res.json(props);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/:chipId', async (req,res) => {
    const userData = await Prop.find({chipId: req.params.chipId});
    res.json(userData);
});

router.get('/sector/', async (req, res) => {
    try {
      const props = await SectorProp.find();
      res.json(props);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/sector/:chipId', async (req,res) => {
    const userData = await SectorProp.find({chipId: req.params.chipId});
    res.json(userData);
});

// PUT route to update a new sector Prop
router.put('/sector/:chipId', async (req, res) => {
    const chipId = Number(req.params.chipId);
    const data = req.body;
    try{
        const result = await SectorProp.updateOne({chipId}, {$set: data});
        res.send(result);
    }
    catch(err: any){
        res.status(500).json({ message: err.message });
    }
});
  
router.delete('/:chipId', async (req, res) =>{
    const chipId = Number(req.params.chipId);
    const result = await Prop.deleteOne({chipId});
    res.send(result);
});

export default router;