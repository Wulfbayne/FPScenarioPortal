import mongoose, {Document, Model} from "mongoose";

const Schema = mongoose.Schema;

interface IProp extends Document {
    name: string;
    chipId: string;
    propType: string;
}

const PropSchema = new mongoose.Schema<IProp>({
    name: { type: String, required: true },
    chipId: { type: String, required: true },
    propType: { type: String, required: true },
});

export const Prop: Model<IProp> = mongoose.model('Prop', PropSchema);

// Define a specific prop type
interface ISectorProp extends IProp {
    lat: number;
    long: number;
    sector: string;
    cycleTime: number;
    challengeTime: number;
    controllingTeam: string;
}

const SectorPropSchema = new mongoose.Schema<ISectorProp>({
    name: { type: String, required: true },
    chipId: { type: String, required: true },
    controllingTeam: { type: String, required: true },
    propType: { type: String, required: true },
    lat: { type: Number },
    long: { type: Number },
    sector: { type: String },
    cycleTime: { type: Number },
    challengeTime: { type: Number },
});

export const SectorProp: Model<ISectorProp> = mongoose.model('SectorProp', SectorPropSchema);