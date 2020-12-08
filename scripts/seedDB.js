const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/GameCite"
);

const scoresSeed = [
    {
        gamerTag: "GW7",
        rogueScore: 1000,
        dinoScore: 20000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "JA1",
        rogueScore: 900,
        dinoScore: 18000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "TJ9",
        rogueScore: 800,
        dinoScore: 16000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "JM7",
        rogueScore: 700,
        dinoScore: 14000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "JQA9",
        rogueScore: 600,
        dinoScore: 12000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "AJ7",
        rogueScore: 500,
        dinoScore: 10000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "MVB1",
        rogueScore: 400,
        dinoScore: 8000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "WHH1",
        rogueScore: 300,
        dinoScore: 6000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "JT5",
        rogueScore: 200,
        dinoScore: 4000,
        date: new Date(Date.now())
    },
    {
        gamerTag: "JKP9",
        rogueScore: 100,
        dinoScore: 2000,
        date: new Date(Date.now())
    },
];

db.HighScore
  .remove({})
  .then(() => db.HighScore.collection.insertMany(scoresSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });