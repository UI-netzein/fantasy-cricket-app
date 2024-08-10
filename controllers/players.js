const { players } = require("../models/index");

const getAllPlayers = async (req, res) => {
  try {
    const allPlayers = await players.find();
    res.status(200).json({
      statusCode:200,
      players:allPlayers
    })
  } catch (error) {
    res.status(200).json({
      statusCode:200,
      message:error
    })
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = await players.create(req.body.player);
    res.status(201).json({
      statusCode:201,
      players:player
    })
  } catch (error) {
    res.status(200).json({
      statusCode:200,
      message:error
    })
  }
};

const createManyPlayers = async (req, res) => {
  try {
    const addedPlayers = await players.insertMany(req.body.players);
    res.status(201).json({
      statusCode:201,
      message:addedPlayers
    })
  } catch (error) {
    res.status(200).json({
      statusCode:200,
      message:error
    })
  }
};


module.exports = {
    getAllPlayers,
    createPlayer,
    createManyPlayers
}