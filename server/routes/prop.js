const express = require("express");
const router = express.Router();
const sectorProps = require("../schemas/sectorProp.js");


router.get('/', async (req,res) => {
    const props = await sectorProps.find({});
    // res.json(props);
    res.send("You reached the Get All Props endpoint");
})


router.post('/register', async (req, res) =>{
    console.log(req.body);
    if (req.body.propType == "Sector"){
        console.log("propType is Sector");
        let newProp = new sectorProps({
            chipId: req.body.chipId,
            propType: req.body.propType,
        });
        try {
            console.log("Trying to add to DB");
            const result = await sectorProps.insertMany(newProp);
            console.log(result);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.send(error.code.toString());
        }        
    }
})









module.exports = router;