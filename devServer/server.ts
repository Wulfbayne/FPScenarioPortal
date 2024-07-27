///<reference path="../declarations.d.ts" />

// Imports
import express from "express";
import http from "http";
import { Server } from "socket.io";
import compression from "compression";
const app = express();
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/user";

// Load Envs
dotenv.config(
    { path: "./devServer/.env"}
);
const apiUrl = process.env.API_URL;
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL as string;

// Establish Server

// const server = http.createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//     console.log("Client Connected");
// });

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(compression());
app.use(apiUrl + "/users", userRoute);

// Load DB
mongoose.connect(mongoUrl)
.then(() => console.log('Connected to DB!'))
.catch((error) => console.log(error));

// Load Index
app.use(express.static(path.join(__dirname, "/../website")));

// Bottom of Server Applet
app.use((req, res) => {
    res.status(404);
    res.send('<h1>Error 404: Resource Not Found</h1>');
})

app.listen(port, () => {
    console.log("App listening on port " + port);
})