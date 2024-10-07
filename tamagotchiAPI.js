const express = require("express");
const cors = require('cors')
const fs = require("fs");

let app = express();
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
    res.send("🟩 API is running");
})

app.get("/getTamagotchi", async (req, res) => {
    const tamagotchi = require("./tamagotchi.json");
    res.json(tamagotchi);
});

app.post("/reload", (req, res) => {
    const tamagotchi = require("./tamagotchi.json");
    let timePassed = (new Date().valueOf())-tamagotchi.lastUpdate;
    let secondsPassed = timePassed/1000;
    console.log(secondsPassed +"seconds")
    if(secondsPassed >= 10) {
        tamagotchi.happiness--
    }

    let lastUpdate = req.body.lastUpdate;

    const fileName = './tamagotchi.json';
    const file = require(fileName);

    //file.lastUpdate = lastUpdate;

    //fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        //if (err) return console.log(err); 
    //});
    res.json(req.body);
})

app.post("/postTamagotchi", (req, res) => {
    let name = req.body.name;
    let bornTime = req.body.bornTime;
    let happiness = req.body.happiness;
    let hunger = req.body.hunger;
    let energy = req.body.energy;
    let lastUpdate = req.body.lastUpdate;

    const fileName = './tamagotchi.json';
    const file = require(fileName);

    file.name = name;
    file.bornTime = bornTime;
    file.happiness = happiness;
    file.hunger = hunger;
    file.energy = energy;
    file.lastUpdate = lastUpdate;

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
    });
    res.json(req.body);
})

// Use port 3001 to connect to the server
app.listen(3001, function () {
    console.log("🟩 Server started on port 3001");
});