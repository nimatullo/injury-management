const MongoService = require("../db");

class PlayerService {
  constructor() {
    this.collection = "Player";
    this.mongoService = new MongoService();
  }

  async getPlayers() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getPlayers()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getPlayer(id) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .get(this.collection, id)
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

  async addNewInjuryToPlayer(playerId, injuryName, injuryDate) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .addInjuryToPlayer(playerId, injuryName, injuryDate)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getInjuredPlayers() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getInjuredPlayers()
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
