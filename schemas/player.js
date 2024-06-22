const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
    {
        uid: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        team: {type: String},
        unit: {type: String},
        paintAmt: {type: Number},
        paintType: {type: String},
        checkedIn: {type: Boolean},
        hasBadge: {type: Boolean},
        hasRFID: {type: Boolean},
        rfid: {type: String} 
    }
)

const player = mongoose.model("player", propSchema);

module.exports = Prop;