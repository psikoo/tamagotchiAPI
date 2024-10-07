var express = require("express");
const fs = require("fs");

const tama = require("./tama.json");


let app = express();
app.use(express.json())

app.get("/", function (req, res) {
    res.send("🟩 API is running");
})

app.get("/getTamagotchi", async (req, res) => {
    res.json(tama);
});

app.post("/postTamagotchi", (req, res) => {
    let name = req.body.name;
    let bornTime = req.body.bornTime;
    let happiness = req.body.stats.happiness;
    let hunger = req.body.stats.hunger;
    let energy = req.body.stats.energy;

    const fileName = './tama.json';
    const file = require(fileName);
    
    file.name = name;
    file.bornTime = bornTime;
    file.stats.happiness = happiness;
    file.stats.hunger = hunger;
    file.stats.energy = energy;

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + "./tama.json");
    });
    res.json(req.body);
})

// Use port 3001 to connect to the server
app.listen(3001, function () {
    console.log("🟩 Server started on port 3001");
});