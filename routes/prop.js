const express = require("express");
const router = express.Router();
// const sectorProp = require("../schemas/sectorProp.js")


router.get('/', async (req,res) => {
    // const props = await user.find({}).select("name uid role");
    // res.json(props);
    res.send("You reached the Get All Props endpoint");
})












module.exports = router;