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

import errorHandler from "./middlewares/errorHandler";;
import notFound from "./errors/notFound";

import userRoute from "./routes/user";
import rolesRoute from "./routes/roles";
import propRoute from "./routes/prop";
import playerRoute from "./routes/player";

// Load Envs
dotenv.config(
    { path: "./devServer/.env"}
);
const apiUrl = process.env.API_URL;
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL as string;

// Establish Server

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",  // Allow all origins
      methods: ["GET", "POST"],  // Allow GET and POST methods
      allowedHeaders: ["my-custom-header"],  // Allow specific custom headers
      credentials: true  // Allow credentials
    }
  });

io.on("connection", (socket) => {
    console.log("Client Connected");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(compression());
app.use(apiUrl + "/users", userRoute);
app.use(apiUrl + "/roles", rolesRoute);
app.use(apiUrl + "/props", propRoute);
app.use(apiUrl + "/layer", playerRoute);

// Load DB
mongoose.connect(mongoUrl)
.then(() => console.log('Connected to DB!'))
.catch((error) => console.log(error));

// Load Index
app.use(express.static(path.join(__dirname, "/../website")));

// Bottom of Server Applet
// app.use((req, res) => {
//     res.status(404);
//     res.send('<h1>Error 404: Resource Not Found</h1>');
// })

app.use((req, res, next) => {
    next(new notFound());
});

app.use(errorHandler);

server.listen(port, () => {
    console.log("App listening on port " + port);
})