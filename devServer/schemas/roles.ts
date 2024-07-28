import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IRoles extends Document {
    name: string;
    roleId: number;
}

const roleSchema = new Schema<IRoles>(
    {
        name: {type: String, required: true, unique: true},
        roleId: {type: Number, required: true, unique: true}
    }
)

const Roles = mongoose.model<IRoles>("Roles", roleSchema);

export default Roles;