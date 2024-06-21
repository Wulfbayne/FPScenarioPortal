const mongoose = require("mongoose");
const propSchema = require("./prop.js");

let sectorPropSchema = new propSchema();
sectorPropSchema.add({
    
    // meta: {type: Array}
})

propSchema.discriminator("sectorProp", sectorPropSchema);

module.exports = mongoose.model(sectorProp);