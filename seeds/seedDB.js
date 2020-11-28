const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/GameCite"
);

const scoresSeed = [
    {
        name: "GW7",
        rogueScore: 1000,
        dinoScore: 1000,
        date: new Date(Date.now())
    },
    {
        name: "JA1",
        rogueScore: 900,
        dinoScore: 900,
        date: new Date(Date.now())
    },
    {
        name: "TJ9",
        rogueScore: 800,
        dinoScore: 800,
        date: new Date(Date.now())
    },
    {
        name: "JM7",
        rogueScore: 700,
        dinoScore: 700,
        date: new Date(Date.now())
    },
    {
        name: "JQA9",
        rogueScore: 600,
        dinoScore: 600,
        date: new Date(Date.now())
    },
    {
        name: "AJ7",
        rogueScore: 500,
        dinoScore: 500,
        date: new Date(Date.now())
    },
    {
        name: "MVB1",
        rogueScore: 400,
        dinoScore: 400,
        date: new Date(Date.now())
    },
    {
        name: "WHH1",
        rogueScore: 300,
        dinoScore: 300,
        date: new Date(Date.now())
    },
    {
        name: "JT5",
        rogueScore: 200,
        dinoScore: 200,
        date: new Date(Date.now())
    },
    {
        name: "JKP9",
        rogueScore: 100,
        dinoScore: 100,
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