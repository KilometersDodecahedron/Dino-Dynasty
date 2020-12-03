const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highScoreSchema = new Schema ({
    userID: {type: String, required: true},
    rogueScore: {type: Number, required: true},
    dinoScore: {type: Number, required: true},
    date: { type: Date, default: Date.now }
});

const HighScore = mongoose.model("HighScore", highScoreSchema);

module.exports = HighScore;