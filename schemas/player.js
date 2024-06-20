const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
    {
        uid: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        rfid: {type: String},
        team: {type: String},
        unit: {type: String}
    }
)

const player = mongoose.model("player", propSchema);

module.exports = Prop;