const mongoose = require("mongoose");
const playerSchema = require('../utils/playerSchema')


module.exports = mongoose.model('players',playerSchema) 