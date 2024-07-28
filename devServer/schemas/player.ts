import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IPlayer extends Document {
    uid: String;
    firstName: String;
    lastName: String;
    team: String;
    unit: String;
    paintAmt: Number;
    paintType: String;
    checkedIn: Boolean;
    hasBadge: Boolean;
    hasRFID: Boolean;
    rfid: String;
}

const playerSchema = new Schema<IPlayer>(
    {
        uid: {type: String, required: true, unique: true},
        firstName: {type: String, required: true, unique: true},
        lastName: {type: String, required: true, unique: true},
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

const Player = mongoose.model<IPlayer>("Players", playerSchema);

export default Player;