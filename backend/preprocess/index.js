const fs = require("fs");

// Player Information
const playerUrl = "http://data.nba.net/data/10s/prod/v1/2022/players.json";
// Make a request and filter all the players with teamId: "1610612755"

const fetchTeamPlayers = async () => {
  return fetch(playerUrl)
    .then((response) => response.json())
    .then((data) => {
      const players = data.league.standard
        .filter((player) => player.teamId === "1610612751")
        .map((player) => {
          return {
            name: player.firstName + " " + player.lastName,
            playerId: player.personId,
            number: player.jersey,
            position: player.pos,
            height: player.heightFeet + "'" + player.heightInches + '"',
            weight: player.weightPounds,
            age: player.age,
            playerPhoto: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
          };
        });
      return players;
    });
};

async function main() {
  const players = await fetchTeamPlayers();
  fs.writeFileSync("players.json", JSON.stringify(players));
}

main();
