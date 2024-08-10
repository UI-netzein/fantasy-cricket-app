const { createTeam,getAllTeams,getTeamById } = require('../../controllers/addTeam');

const router = require('express').Router();

router.get('/',getAllTeams);
router.post('/',createTeam);
router.get('/:id',getTeamById);


module.exports = router