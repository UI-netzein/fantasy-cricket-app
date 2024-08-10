const { v4: uuidv4 } = require("uuid");
let pointsObj = {
  catch: 8,
  wicket: 25,
  run_out: 6,
  stumping: 12,
  lbw: 8,
  bowled: 8,
  catch_bonus_3: 4,
  wicket_bonus_3: 4,
  wicket_bonus_4: 8,
  wicket_bonus_5: 16,
  run: 1,
  runs_30: 4,
  runs_50: 8,
  runs_100: 16,
  captain: 2,
  vice_captain: 1.5,
};

const getBowlingPoints = (kind) => {
  let points = 0;
  switch (kind) {
    case "bowled":
      points = pointsObj.bowled;
      break;
    case "lbw":
      points = pointsObj.lbw;
      break;
    case "stumping":
      points = pointsObj.stumping;
      break;
  }
  if (kind !== "run_out") {
    points += pointsObj.wicket;
  }
  return points;
};
const getFieldingPoints = (kind) => {
  let points = 0;
  switch (kind) {
    case "caught":
      points = pointsObj.catch;
      break;
    case "run_out":
      points = pointsObj.run_out;
      break;
    case "stumping":
      points = pointsObj.stumping;
      break;
  }
  return points;
};

const getBatsmanPoint = (batsmanRun, totalRun) => {
  let points = 0;
  if (batsmanRun === totalRun) {
    switch (batsmanRun) {
      case 6:
        points = pointsObj.run * 6 + 2;
        break;
      case 5:
        points += pointsObj.run * 5;
        break;
      case 4:
        points += pointsObj.run * 4 + 1;
        break;
      case 3:
        points += pointsObj.run * 3;
        break;
      case 2:
        points += pointsObj.run * 2;
        break;
      case 1:
        points += pointsObj.run * 1;
        break;
    }
  }
  return points;
};
const getResult = (team, matchResult) => {
  let dreamTeam = [];
  let totalTeamPoints = 0;
  for (let player of team) {
    const playerRecords = matchResult.filter(
      (match) =>
        player.player === match.batter ||
        player.player === match.bowler ||
        player.player === match.fielders_involved ||
        player.player === match.player_out
    );
    let totalPoints = 0;
    let totalRuns = 0;
    let totalWickets = 0;
    let totalCatch = 0;
    let isThirdyPointsApplicable = true;
    let isFiftyPointsApplicable = true;
    let isHundredPointsApplicable = true;
    for (let record of playerRecords) {
      if (!record.isWicketDelivery && record.batter === player.player) {
        let points = getBatsmanPoint(record.batsman_run, record.total_run);
        totalRuns += record.batsman_run;
        if (totalRuns >= 30 && isThirdyPointsApplicable) {
          points += pointsObj.runs_30;
          isThirdyPointsApplicable = false;
        }
        if (totalRuns >= 50 && isFiftyPointsApplicable) {
          points += pointsObj.runs_50;
          isFiftyPointsApplicable = false;
        }
        if (totalRuns >= 100 && isHundredPointsApplicable) {
          points += pointsObj.runs_100;
          isFiftyPointsApplicable = false;
        }
        totalPoints += points;
      } else if(record.isWicketDelivery) {
        if (record.player_out === player.player) continue;
        
        let catchBonus = true;
        if (
          (record.kind === "caught" ||
          record.kind === "run_out" ||
          record.kind === "stumping") && player.player === record.fielders_involved
        ) {
          let points = getFieldingPoints(record.kind);
          if (record.kind === "caught") totalCatch += 1;
          if (totalCatch >= 3 && catchBonus) {
            points += pointsObj.catch_bonus_3;
            catchBonus = false;
          }
          totalPoints += points;
        } else {
          let points = getBowlingPoints(record.kind);
          let threeWicketBonus = true;
          let fourWicketBonus = true;
          let fiveWicketBonus = true;
          totalWickets += 1;
          if (totalWickets >= 3 && threeWicketBonus) {
            points += pointsObj.wicket_bonus_3;
            threeWicketBonus = false;
          }
          if (totalWickets >= 4 && fourWicketBonus) {
            points += pointsObj.wicket_bonus_4;
            fourWicketBonus = false;
          }
          if (totalWickets >= 5 && fiveWicketBonus) {
            points += pointsObj.wicket_bonus_5;
            fiveWicketBonus = false;
          }
          totalPoints += points;
        }
      }
    }
    let newObj = {
      name: player.player,
      team: player.team,
      role: player.role,
      is_captain: player.is_captain,
      is_vice_captain: player.is_vice_captain,
      total_runs: totalRuns,
      total_wickets: totalWickets,
      total_catch: totalCatch,
      total_points: player.is_captain
        ? totalPoints * pointsObj.captain
        : player.is_vice_captain
        ? pointsObj.vice_captain * totalPoints
        : totalPoints,
    };
    totalTeamPoints += newObj.total_points
    dreamTeam.push(newObj);
  }
  return {dreamTeam,totalTeamPoints};
};

module.exports = getResult;
