const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOption = {
    discriminatorKey: "propType",
    collection: "props"
}
const propSchema = new Schema(
    {
        uid: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        type: {type: String, required: true},
        // Lat: {type: String},
        // Long: {type: String},
    }, baseOption
)

module.exports = propSchema;