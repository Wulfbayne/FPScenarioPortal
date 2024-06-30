const express = require("express");
const http = require('http');
const socketIo = require("socket.io");
const compression = require('compression');
let app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user.js");
const propRoute = require("./routes/prop.js");


// Load Envs
dotenv.config(
    {path:"./server/.env"}
);
const APIURL = process.env.API_URL;
const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

const server = http.createServer(app);
const io = new socketIo.Server(server);

io.on('connection', (socket) => {
    console.log('Client Connected');
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(compression());
app.use(APIURL + "/users", userRoute);
app.use(APIURL + "/props", propRoute);

// Load DB
mongoose.connect(MONGOURL)
.then(() => console.log('Connected to DB!'))
.catch((error) => console.log(error));

// Load Index
// app.use("/scenario", express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../public")));

// Web Socket Server


// Bottom of Server Applet
// app.use((req, res) => {
//     res.status(404);
//     res.send('<h1>Error 404: Resource Not Found</h1>');
// })

server.listen(PORT, () => {
    console.log("App listening on port " + PORT);
})


// Load WSS
// const wss = new WebSocketServer({ noServer: true });


