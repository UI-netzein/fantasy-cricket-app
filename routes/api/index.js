const router = require('express').Router();
const playerRouting = require('./players');
const teamRouting = require('./addTeam');
const processResultRouting  = require('./processResult');

router.use('/players', playerRouting);
router.use('/teams', teamRouting);
router.use('/process-result', processResultRouting);


module.exports = router;