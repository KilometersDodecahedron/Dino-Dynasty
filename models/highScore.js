const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highScoreSchema = new Schema ({
    userID: {type: String, required: true},
    gamerTag: {type: String, required: true},
    rogueScore: {type: Number, default: 0},
    dinoScore: {type: Number, default: 0},
    date: { type: Date, default: Date.now }
});

const HighScore = mongoose.model("HighScore", highScoreSchema);

module.exports = HighScore;