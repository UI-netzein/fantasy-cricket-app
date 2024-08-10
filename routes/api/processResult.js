const { getTeamResult,multipleTeamResults } = require("../../controllers/processResult");

const router = require("express").Router();

router.get("/:id", getTeamResult);

router.get("/", multipleTeamResults);


module.exports = router;
