const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    player:{
        type:String,
        required:[true,'player name is required']
    },
    team:{
        type:String,
        required:[true,'team name is required']
    },
    role:{
        type:String,
        enum:['BATTER','ALL-ROUNDER','WICKETKEEPER','BOWLER'],
        required:[true,'player role is required']
    }
})


module.exports = PlayerSchema