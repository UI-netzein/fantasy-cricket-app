const { addTeam } = require("../models/index");
const matchResult = require("../data/match.json");
const getResult = require("../utils/getResult");

const getTeamResult = async (req, res) => {
  try {
    const teamId = req?.params?.id;
    const team = await addTeam.findById(teamId);
    let teamResult = [];
    let totalTeamPoints = 0;
    if (team.team.length) {
      let matchRes = getResult(team?.team, matchResult);
      teamResult = matchRes.dreamTeam;
      totalTeamPoints = matchRes.totalTeamPoints;
    }
    res.status(200).json({
      statusCode: 200,
      teamResult,
      totalTeamPoints,
    });
  } catch (error) {
    res.status(200).json({
      statusCode: 200,
      message: error,
    });
  }
};

const multipleTeamResults = async (req, res) => {
  try {
    const teams = await addTeam.find();
    let teamResult = [];
    let totalTeamPoints = 0;
    for (let team of teams) {
      let matchRes = getResult(team?.team, matchResult);
      totalTeamPoints = matchRes.totalTeamPoints;
      teamResult.push({
        team: {
          name: team.name,
          id: team._id,
          totalTeamPoints,
        },
      });
    }
    res.status(200).json({
      statusCode: 200,
      teamResult:teamResult.slice().sort((a,b) => b.team.totalTeamPoints - a.team.totalTeamPoints),
    });
  } catch (error) {
    res.status(200).json({
      statusCode: 200,
      message: error,
    });
  }
};

module.exports = {
  getTeamResult,
  multipleTeamResults,
};
