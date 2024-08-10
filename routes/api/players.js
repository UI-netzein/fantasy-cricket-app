const { getAllPlayers, createPlayer, createManyPlayers } = require('../../controllers/players');

const router = require('express').Router();

router.get('/',getAllPlayers);
router.post('/',createPlayer);
router.post('/list',createManyPlayers);


module.exports = router