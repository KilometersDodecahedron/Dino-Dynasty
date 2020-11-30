const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //required for login
    userName: { 
        type: String, 
        required: true,
        maxlength: 30,
        minlength: 1 },
    //required for login
    password: { 
        type: String, 
        required: true,
        maxlength: 20,
        minlength: 8 },
    //set next to high score
    gamerTag: { 
        type: String, 
        required: true,
        maxlength: 6,
        minlength: 3 },
    rogueBlitzScore: {
        type: Number,
        default: 0
    },
    dynoDynastyScore: {
        type: Number,
        default: 0
    },
    //if false, creates a new high score for them rather than updating an old one
    //set "true" the first time they get any score on the game
    hasPlayed: {
        type: Boolean,
        default: false
    },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;