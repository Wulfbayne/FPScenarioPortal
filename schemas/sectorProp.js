const mongoose = require("mongoose");
const propSchema = require("./prop.js");

let sectorPropSchema = new propSchema();
sectorPropSchema.add({
    type: {type: String, required: true},
    // meta: {type: Array}
})

propSchema.discriminator("sectorProp", sectorPropSchema);

module.exports = mongoose.model(sectorProp);