const express = require("express");
const cors = require('cors')
const fs = require("fs");

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

app.post("/reload", (req, res) => {
    let timePassed = (new Date().valueOf())-tamagotchi.lastUpdate;
    let secondsPassed = timePassed/1000;
    if(secondsPassed >= 20) {
        tamagotchi.happiness--;
        tamagotchi.hunger--;
        tamagotchi.energy--;
        tamagotchi.lastUpdate = req.body.lastUpdate;
    }
    res.json(req.body);
})

app.post("/postTamagotchi", (req, res) => {
    tamagotchi.name = req.body.name;
    tamagotchi.bornTime = req.body.bornTime;
    tamagotchi.happiness = req.body.happiness;
    tamagotchi.hunger = req.body.hunger;
    tamagotchi.energy = req.body.energy;
    tamagotchi.lastUpdate = req.body.lastUpdate;
    res.json(req.body);
})

// Use port 3001 to connect to the server
app.listen(3001, function () {
    console.log("🟩 Server started on port 3001");
});