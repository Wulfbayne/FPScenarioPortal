const express = require("express");
// const ws = require("WebSocketServer");
const compression = require('compression');
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user.js");
const propRoute = require("./routes/prop.js");
const ws  = require("ws");

// Load Envs
dotenv.config();
const APIURL = process.env.API_URL;
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(compression());
app.use(APIURL + "/users", userRoute);
app.use(APIURL + "/props", propRoute);

// Load DB
mongoose.connect(MONGOURL)
.then(() => console.log('Connected!'))
.catch((error) => console.log(error));

// Load Index
app.use("/scenario", express.static(path.join(__dirname, "public")));

// Web Socket Server
const wss = new ws.Server({server: app});

wss.on('connection', connection = (ws) =>{
    console.log("A NNew Client Connected");
    ws.send("Welcome to the Freedom Park Scenario Portal");
    ws.on("message", incoming = (message) => {
        console.log("received: %s", message);
    });

    ws.send("something");
})

// Bottom of Server Applet
app.use((req, res) => {
    res.status(404);
    res.send('<h1>Error 404: Resource Not Found</h1>');
})

app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
})


// Load WSS
// const wss = new WebSocketServer({ noServer: true });


