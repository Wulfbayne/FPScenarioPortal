const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectorPropSchema = new Schema(
    {
        chipId: {type: String, required: true, unique: true},
        propType: {type: String, required: true},
        name: {type: String, unique: true},                
        lat: {type: String},
        long: {type: String},
        sector: {type: String},
        cycleTime: {tpe: Number},
        challengeTime: {type: Number},
        controllingTeam: {type: String}
    }
);

const sectorProps = mongoose.model("sectorProps", sectorPropSchema);




module.exports = { sectorProps };