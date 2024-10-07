const express = require("express");
const cors = require('cors')

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
    let timeForTick = 20;
    if(secondsPassed/timeForTick >= 1) { //Add check for 0, substr more than once, change to 1h
        let subtract = secondsPassed/timeForTick;
        tamagotchi.happiness -= subtract;
        tamagotchi.hunger -= subtract;
        tamagotchi.energy -= subtract;
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