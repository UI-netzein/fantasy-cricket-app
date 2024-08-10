const mongoose = require("mongoose");
const playerSchema = require("../utils/playerSchema");
const _ = require('lodash')

const teamSchema = new mongoose.Schema({
  ...playerSchema.obj,
  is_captain: {
    type: Boolean,
    required: true,
  },
  is_vice_captain: {
    type: Boolean,
    required: true,
  },
});

const addTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  team: {
    type: [teamSchema],
    validate: [
      {
        validator: function (arr) {
          if (arr.length < 11) {
            return false;
          }
        },
        message: "a team at least should have 11 players",
      },
      {
        validator: function (arr) {
          if (arr.length > 11) {
            return false;
          }
        },
        message: "a team at most can have 11 players",
      },
      {
        validator: function (arr) {
          let isCaptainSelected = false;
          let isViceCaptainSelected = false;
          let minCount = 0;
          let maxCount = 9;
          let typeCount = {
            'BATTER':0,
            'ALL-ROUNDER':0,
            'WICKETKEEPER':0,
            'BOWLER':0,
          }
          for (ele of arr) {
            if (ele.is_captain && ele.is_vice_captain) {
              this.invalidate(
                "team",
                "same player cannot be made captain and vice caption"
              );
              return false;
            }
            if (ele.is_captain && !isCaptainSelected) {
              isCaptainSelected = true;
            } else {
              if (isCaptainSelected && ele.is_captain) {
                this.invalidate("team", "team can have only one captain");
                return false;
              }
            }
            if (ele.is_vice_captain && !isViceCaptainSelected) {
              isViceCaptainSelected = true;
            } else {
              if (isViceCaptainSelected && ele.is_vice_captain) {
                this.invalidate("team", "team can have only one vice captain");
                return false;
              }
            }
            typeCount[ele.role] = typeCount[ele.role] + 1 
          }
          if(!isCaptainSelected || !isViceCaptainSelected) {
            this.invalidate('team should have a captain and vice captain');
            return false;
          }
          if(typeCount["ALL-ROUNDER"] < minCount || typeCount["ALL-ROUNDER"] > maxCount) {
            this.invalidate(`all rounder count should be in between ${minCount} to ${maxCount}`);
            return false;
          }
          if(typeCount["BATTER"] < minCount || typeCount["ALL-ROUNDER"] > maxCount) {
            this.invalidate(`batsman count should be in between ${minCount} to ${maxCount}`);
            return false;
          }
          if(typeCount["BOWLER"] < minCount || typeCount["ALL-ROUNDER"] > maxCount) {
            this.invalidate(`bowler count should be in between ${minCount} to ${maxCount}`);
            return false;
          }
          if(typeCount["WICKETKEEPER"] < minCount || typeCount["ALL-ROUNDER"] > maxCount) {
            this.invalidate(`wicketkeeper count should be in between ${minCount} to ${maxCount}`);
            return false;
          }
          const groupByTeam = Object.values(_.groupBy(arr,'team'));
          if(groupByTeam.length > 2) { 
            this.invalidate(`more than 2 team player are selected`);
          }
          if(groupByTeam.length === 1) { 
            this.invalidate(`one team can have at most 10 players`);
          }
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("fantasy-team", addTeamSchema);
