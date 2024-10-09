const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require('cors');

require('dotenv').config()

let app = express();
app.use(express.json());
app.use(cors());

const tamagotchi = require("./tamagotchi.json");

app.get("/", function (req, res) {
    res.send("🟩 API is running");
})

app.get("/getTamagotchi", async (req, res) => {
    res.json(tamagotchi);
});

app.get("/play", async (req, res) => {
    if(tamagotchi.happiness < 10) { 
        tamagotchi.happiness++; 
        res.send("Your Tamagotchi feels happier");
    } else { 
        res.send("Your Tamagotchi is too happy, you made it tired");
    }
    tamagotchi.hunger--;
    tamagotchi.energy--;
});
app.get("/feed", async (req, res) => {
    if(tamagotchi.hunger < 10 && tamagotchi.energy < 10) { 
        tamagotchi.hunger++; 
        tamagotchi.energy++; 
        res.send("Your Tamagotchi feels fuller");
    } else {
        res.send("Your Tamagotchi is too full or energetic to eat");
    }
});
app.get("/rest", async (req, res) => {
    if(tamagotchi.energy < 10) { 
        tamagotchi.energy++;
        res.send("Your Tamagotchi feels rested");
    } else {
        res.send("Your Tamagotchi is too energetic, you made it hungry");
    }
    tamagotchi.hunger--;
});

app.post("/reload", (req, res) => {
    let timePassed = (new Date().valueOf())-tamagotchi.lastUpdate;
    let secondsPassed = timePassed/1000;
    let timeForTick = 3600; // change to 3600 (seconds)
    if(secondsPassed/timeForTick >= 1) { 
        let subtract = Math.floor(secondsPassed/timeForTick);
        if((tamagotchi.happiness - subtract <= 0) || (tamagotchi.hunger - subtract <= 0) || (tamagotchi.energy - subtract <= 0)) {
            tamagotchi.state = "Dead";
            tamagotchi.happiness = 0;
            tamagotchi.hunger = 0;
            tamagotchi.energy = 0;
        } else {
            tamagotchi.deadTime = new Date().valueOf();
            tamagotchi.happiness -= subtract;
            tamagotchi.hunger -= subtract;
            tamagotchi.energy -= subtract;
            tamagotchi.lastUpdate = req.body.lastUpdate;
        }
    }
    res.json(req.body);
})

app.post("/postTamagotchi", (req, res) => {
    tamagotchi.name = req.body.name;
    tamagotchi.state = req.body.state;
    tamagotchi.bornTime = req.body.bornTime;
    tamagotchi.deadTime = req.body.deadTime;
    tamagotchi.happiness = req.body.happiness;
    tamagotchi.hunger = req.body.hunger;
    tamagotchi.energy = req.body.energy;
    tamagotchi.lastUpdate = req.body.lastUpdate;
    res.json(req.body);
})

// Use port 3001 to connect to the server over HTTPS
const options = {
    cert: fs.readFileSync(path.join(process.env.SSLPATH, "fullchain.pem")),
    key: fs.readFileSync(path.join(process.env.SSLPATH, "privkey.pem")),
};
const server = https.createServer(options, app);

server.listen(3001, () => {
    console.log("🟩 Server started on port 3001");
});