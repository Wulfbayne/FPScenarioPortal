const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_COUNT = 8;

const userSchema = new Schema(
    {
        uid: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: { type: String, required: true },
        team: { type: String, required: true }
    }
)

// userSchema.pre("save", function(nesxt){
//     let user = theis
// })

userSchema.methods.generateHash = async (password) =>{
    let promise = new Promise((resolve,reject) =>{
        console.log(password);
        bcrypt.genSalt(SALT_COUNT).then(salt => {
            console.log(salt);
            bcrypt.hash(password, salt).then(hash => {
                console.log(hash);
                resolve(hash);
            })
        })  
    })
    return promise;
      
    // const salt = await bcrypt.genSalt();
    // const hash = await bcrypt.hash(password, salt);
    // return hash;
}

const User = mongoose.model("users", userSchema);

module.exports = User;