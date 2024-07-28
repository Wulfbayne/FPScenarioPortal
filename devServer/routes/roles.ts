import express from "express";
const router = express.Router();
import Roles from "../schemas/roles";

interface CustomError extends Error {
    code?: string;
}

router.get('/', async (req,res) => {
    const rolesData = await Roles.find({}).select("name roleId");
    res.json(rolesData);
})

export default router;