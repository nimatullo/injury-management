const MongoService = require("../db");
const axios = require("axios");

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

  async get() {
    return await this.mongoService.getAll(this.collection);
  }

  async generateRecoveryTracking() {
    // const playerName = this.PLAYERS_TRACKED[0].name;
    // const playerDate = this.PLAYERS_TRACKED[0].date;
    // const player = await this.mongoService.getPlayerByName(playerName);

    // return this.fetchGamesBefore(player.realId, playerDate);

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
    const before = await this.fetchGamesBefore(playerId, date);

    const beforeAvg = this.getAvg(
      Object.keys(before.PlayerGameLogs)
        .reverse()
        .slice(0, this.NUMBER_OF_GAMES),
      before.PlayerGameLogs
    );

    const after = await this.fetchGamesAfter(playerId, date);

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

  async fetchGamesBefore(playerId, date) {
    const url = `https://stats.nba.com/stats/playergamelogs?DateFrom=&DateTo=${date}&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&Period=0&PerMode=Totals&PlayerID=${playerId}&PlusMinus=N&PORound=0&Rank=N&Season=2022-23&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&VsConference=&VsDivision=&`;

    const headers = {
      Host: "stats.nba.com",
      Referer: "https://www.nba.com",
      Origin: "https://stats.nba.com/",
      Connection: "keep-alive",
      "x-nba-stats-origin": "stats",
      "x-nba-stats-token": "true",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const response = await axios.get(url, { headers });
    return this.formatData(response.data);
  }

  async fetchGamesAfter(playerId, date) {
    const url = `https://stats.nba.com/stats/playergamelogs?DateFrom=${date}&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&Period=0&PerMode=Totals&PlayerID=${playerId}&PlusMinus=N&PORound=0&Rank=N&Season=2022-23&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&VsConference=&VsDivision=&`;

    const headers = {
      Host: "stats.nba.com",
      Referer: "https://www.nba.com",
      Origin: "https://stats.nba.com/",
      Connection: "keep-alive",
      "x-nba-stats-origin": "stats",
      "x-nba-stats-token": "true",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const response = await axios.get(url, { headers });
    return this.formatData(response.data);
  }

  async formatData(json) {
    try {
      var data = {};

      var result_set = json.resultSets;
      for (let i in result_set) {
        var merged = {};
        if (result_set[i].rowSet.length !== 1) {
          var multipleRowSets = {};
          for (let j in result_set[i].rowSet) {
            var temp = {};
            for (let k in result_set[i].headers) {
              temp[result_set[i].headers[k]] = result_set[i].rowSet[j][k];
            }
            multipleRowSets[j] = temp;
          }
          data[result_set[i].name] = multipleRowSets;
        } else {
          for (let j in result_set[i].headers) {
            merged[result_set[i].headers[j]] = result_set[i].rowSet[0][j];
          }
          data[result_set[i].name] = merged;
        }
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Recovery;
