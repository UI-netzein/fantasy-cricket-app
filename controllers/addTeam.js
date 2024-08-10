const {addTeam} = require("../models/index");

const getAllTeams = async (req, res) => {
  try {
    const listOfTeams = await addTeam.find();
    res.status(200).json({
      statusCode:200,
      teams:listOfTeams
    })
  } catch (error) {
    res.status(200).json({
      statusCode:200,
      message:error
    })
  }
};

const getTeamById = async (req, res) => {
    try {
      const teamId = req?.params?.id
      const team = await addTeam.findById(teamId);
      res.status(200).json({
        statusCode:200,
        team
      })
    } catch (error) {
      res.status(200).json({
        statusCode:200,
        message:error
      })
    }
  };

const createTeam = async (req, res) => {
  try {
    const teamObj = req?.body
    const team = await addTeam.create(teamObj);
    res.status(201).json({
      statusCode:201,
      team
    })
  } catch (error) {
    res.status(200).json({
      statusCode:200,
      message:error
    })
  }
};


module.exports = {
    getAllTeams,
    getTeamById,
    createTeam
}