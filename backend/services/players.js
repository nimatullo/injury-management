const MongoService = require("../db");

class PlayerService {
  constructor() {
    this.collection = "Player";
    this.mongoService = new MongoService();
  }

  async getPlayers() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getAll(this.collection)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addPlayer(player) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .add(this.collection, player)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addNewInjuryToPlayer(playerId, injury) {
    const injury = await this.mongoService.tryFindInjury(injuryName);

    return new Promise((resolve, reject) => {
      this.mongoService
        .addInjuryToPlayer(playerId, injury)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = PlayerService;
