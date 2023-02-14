const nba = require("nba-api-client");
const MongoService = require("../db");

class Recovery {
  constructor() {
    this.collection = "Recovery";
    this.mongoService = new MongoService();
    this.NUMBER_OF_GAMES = 5;
    this.PLAYERS_TRACKED = [
      {
        name: "T.J. Warren",
        date: "01/27/2023",
      },
      {
        name: "Yuta Watanabe",
        date: "02/07/2023",
      },
      {
        name: "Ben Simmons",
        date: "01/26/2023",
      },
    ];
  }

  async generateRecoveryTracking() {
    let result = [];

    for (const recoveredPlayer of this.PLAYERS_TRACKED) {
      const player = await this.mongoService.getPlayerByName(
        recoveredPlayer.name
      );
      const data = await this.getAvgs(player.realId, recoveredPlayer.date);
      result.push({
        player: {
          name: player.name,
          photo: player.playerPhoto,
        },
        ...data,
      });
    }

    return result;
  }

  async getAvgs(playerId, date) {
    const before = await nba.playerBoxScores({
      Season: "2022-23",
      PlayerID: playerId,
      DateTo: date,
    });

    const beforeAvg = this.getAvg(
      Object.keys(before.PlayerGameLogs)
        .reverse()
        .slice(0, this.NUMBER_OF_GAMES),
      before.PlayerGameLogs
    );

    const after = await nba.playerBoxScores({
      Season: "2022-23",
      PlayerID: playerId,
      DateFrom: date,
    });

    const afterAvg = this.getAvg(
      Object.keys(after.PlayerGameLogs).slice(0, this.NUMBER_OF_GAMES),
      after.PlayerGameLogs
    );

    return {
      beforeAvg,
      afterAvg,
      recoveryPercentage: ((afterAvg / beforeAvg) * 100).toFixed(2),
    };
  }

  getAvg(lastGames, gamelog) {
    return (
      lastGames.reduce((acc, game) => {
        return acc + gamelog[game].NBA_FANTASY_PTS;
      }, 0) / this.NUMBER_OF_GAMES
    );
  }
}

module.exports = Recovery;
