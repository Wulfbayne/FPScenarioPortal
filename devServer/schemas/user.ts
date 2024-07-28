import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const saltCount = 8;

interface IUser extends Document {
    uid: string;
    name: string;
    password: string;
    role: string;
    generateHash(password: string): Promise<string>;
}

const userSchema = new Schema<IUser>(
    {
        uid: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: { type: String, required: true }
    }
)

userSchema.methods.generateHash = async function(password: string){
    return new Promise ((resolve,reject) =>{
        bcrypt.genSalt(saltCount).then(salt => {
            bcrypt.hash(password, salt).then(hash => {
                resolve(hash);
            })
        })  
    })
}

const User = mongoose.model<IUser>("User", userSchema);

export default User;